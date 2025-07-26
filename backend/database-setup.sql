-- Bridge Food Connect Database Setup
-- Run these SQL commands in your Supabase SQL editor

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  user_type TEXT CHECK (user_type IN ('donor', 'recipient', 'organization')) NOT NULL DEFAULT 'recipient',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create food_items table
CREATE TABLE IF NOT EXISTS food_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  quantity TEXT NOT NULL,
  expiry_date DATE,
  pickup_location TEXT NOT NULL,
  category TEXT,
  dietary_info TEXT[],
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'requested', 'completed', 'expired')) NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create food_requests table
CREATE TABLE IF NOT EXISTS food_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  food_item_id UUID REFERENCES food_items(id) ON DELETE CASCADE,
  requested_by UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_food_items_created_by ON food_items(created_by);
CREATE INDEX IF NOT EXISTS idx_food_items_status ON food_items(status);
CREATE INDEX IF NOT EXISTS idx_food_items_created_at ON food_items(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_food_requests_food_item_id ON food_requests(food_item_id);
CREATE INDEX IF NOT EXISTS idx_food_requests_requested_by ON food_requests(requested_by);
CREATE INDEX IF NOT EXISTS idx_food_requests_status ON food_requests(status);

-- Enable Row Level Security (RLS) for security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Food items policies
CREATE POLICY "Anyone can view available food items" ON food_items
  FOR SELECT USING (status = 'available' OR created_by = auth.uid());

CREATE POLICY "Users can create food items" ON food_items
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own food items" ON food_items
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own food items" ON food_items
  FOR DELETE USING (auth.uid() = created_by);

-- Food requests policies
CREATE POLICY "Users can view requests for their food items or their own requests" ON food_requests
  FOR SELECT USING (
    auth.uid() = requested_by OR 
    auth.uid() IN (SELECT created_by FROM food_items WHERE id = food_item_id)
  );

CREATE POLICY "Users can create food requests" ON food_requests
  FOR INSERT WITH CHECK (auth.uid() = requested_by);

CREATE POLICY "Users can update their own requests or requests for their food items" ON food_requests
  FOR UPDATE USING (
    auth.uid() = requested_by OR 
    auth.uid() IN (SELECT created_by FROM food_items WHERE id = food_item_id)
  );

-- Function to automatically create profile on user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Anonymous User'),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'recipient')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_food_items_updated_at BEFORE UPDATE ON food_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_food_requests_updated_at BEFORE UPDATE ON food_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
