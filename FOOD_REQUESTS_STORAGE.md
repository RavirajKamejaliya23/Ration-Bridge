# 🍽️ RationBridge Food Request Storage Guide

## 📊 **WHERE FOOD REQUESTS ARE STORED**

### **1. 🗄️ Database Storage Location**
- **Database:** Supabase PostgreSQL
- **Table Name:** `food_requests`
- **Direct Access:** https://ldajouniuhtpfrvhlwfb.supabase.co → Database → Tables → food_requests

### **2. 📋 Food Request Data Structure**

Each food request contains the following information:

```sql
CREATE TABLE food_requests (
  id UUID PRIMARY KEY,                    -- Unique request ID
  food_item_id UUID,                     -- Links to the food being requested
  requested_by UUID,                     -- User who made the request
  message TEXT,                          -- Optional message from requester
  status TEXT DEFAULT 'pending',        -- pending, approved, rejected, completed
  created_at TIMESTAMP,                 -- When request was made
  updated_at TIMESTAMP                  -- Last modification time
);
```

### **3. 🔗 Related Data Tables**

Food requests connect to other tables:
- **`food_items`** - Contains the food being requested
- **`profiles`** - Contains user information (requester details)
- **`auth.users`** - Supabase authentication data

## 🌐 **HOW TO ACCESS FOOD REQUESTS**

### **A. Supabase Dashboard (Direct Database Access)**
1. **Login:** Go to https://ldajouniuhtpfrvhlwfb.supabase.co
2. **Navigate:** Database → Tables → food_requests
3. **View:** All food requests with complete details
4. **Filter:** Use SQL queries or table filters

### **B. API Endpoints**
- **View All Requests:** `GET /api/food/requests` (requires authentication)
- **View Item Requests:** `GET /api/food/:id/requests` (for food donors)
- **Submit Request:** `POST /api/food/:id/request` (requires authentication)

### **C. Frontend Pages**
- **Requests Dashboard:** http://localhost:3001/requests
- **Test Dashboard:** http://localhost:3001/test
- **Admin Dashboard:** http://localhost:3001/admin

## 🔄 **FOOD REQUEST WORKFLOW**

### **Step 1: Request Submission**
1. User finds available food item
2. Clicks "Request Food"
3. Adds optional message
4. Submits request
5. **Stored in:** `food_requests` table with status `pending`

### **Step 2: Request Management**
1. Food donor receives notification (future feature)
2. Donor can view requests for their food items
3. Donor approves/rejects requests
4. **Status updates in:** `food_requests` table

### **Step 3: Request Fulfillment**
1. Approved requests move to `completed` status
2. Food pickup/delivery coordination
3. **Final status:** `completed` in database

## 📈 **REQUEST STATUS FLOW**

```
[pending] → [approved] → [completed]
    ↓
[rejected]
```

## 🔍 **HOW TO CHECK YOUR FOOD REQUESTS**

### **Option 1: Supabase Dashboard**
```
1. Visit: https://ldajouniuhtpfrvhlwfb.supabase.co
2. Login to your Supabase account
3. Navigate: Database → Tables
4. Click: food_requests
5. See: All request data in table format
```

### **Option 2: Frontend Dashboard**
```
1. Visit: http://localhost:3001/requests
2. Login with your RationBridge account
3. View: All requests in user-friendly format
4. Submit: New food requests directly
```

### **Option 3: API Testing**
```
1. Use authentication token
2. Call: GET /api/food/requests
3. Receive: JSON response with all requests
```

## 🛠️ **TESTING FOOD REQUESTS**

### **Complete Test Scenario:**
1. **Register User:** http://localhost:3001/register
2. **Add Food Item:** http://localhost:3001/test (use food creation form)
3. **Request Food:** http://localhost:3001/requests (submit request)
4. **Check Database:** Supabase dashboard → food_requests table
5. **View via API:** GET /api/food/requests

### **Sample Request Data:**
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "food_item_id": "987fcdeb-51a2-43d1-9c45-123456789abc",
  "requested_by": "456e7890-1234-56ab-cdef-987654321abc",
  "message": "I would like to request this food for my family",
  "status": "pending",
  "created_at": "2025-07-26T12:00:00Z",
  "updated_at": "2025-07-26T12:00:00Z"
}
```

## 🔐 **SECURITY & PERMISSIONS**

- **Row Level Security (RLS)** enabled
- **Users can only see:**
  - Their own requests
  - Requests for their food items
- **Authentication required** for all request operations
- **Data isolation** between users

## 📊 **DATA RELATIONSHIPS**

```
food_requests
├── food_item_id → food_items.id
├── requested_by → profiles.id
└── profiles.id → auth.users.id
```

## 🎯 **SUMMARY**

**Your food requests are stored in:**
1. **Supabase Database** - food_requests table
2. **Accessible via** - Dashboard, API, and Frontend
3. **Fully functional** - Create, Read, Update operations
4. **Secure** - Authentication and authorization protected
5. **Integrated** - Connected to food items and user profiles

**Current Status:** ✅ All food request functionality is working and data is being properly stored!
