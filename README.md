# Bridge Food Connect

A full-stack application for connecting food donors with recipients to reduce food waste and help communities share surplus food.

## 🏗️ **Repository Structure**

```
bridge-food-connect/
├── backend/           # Node.js API Server
│   ├── config/        # Database configuration
│   ├── routes/        # API routes
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   ├── .env           # Environment variables
│   └── database-setup.sql # Database schema
├── frontend/          # Frontend Application (To be implemented)
├── README.md          # Project documentation
└── API-TESTING.md     # API testing guide
```

## 🛠️ **Backend Features**

- ✅ **User Authentication**: Register, login, and manage user accounts using Supabase Auth
- ✅ **User Profiles**: Create and manage user profiles with different user types (donor, recipient, organization)
- ✅ **Food Listings**: Create, read, update, and delete food item listings
- ✅ **Food Requests**: Request available food items with messaging
- ✅ **Geolocation Support**: Pickup location management
- ✅ **CORS Enabled**: Ready for frontend integration

## 📱 **Frontend Features** 
*To be implemented:*
- User registration/login interface
- Food donation listing and browsing
- Food request management
- Real-time notifications
- Mobile-responsive design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Environment**: dotenv for configuration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Supabase account
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AKNursumar/bridge-food-connect.git
   cd bridge-food-connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   PORT=3000
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

4. Set up your Supabase database with the required tables (see Database Schema section)

5. Start the development server:
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:3000`

## Database Schema

You'll need to create the following tables in your Supabase database:

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  user_type TEXT CHECK (user_type IN ('donor', 'recipient', 'organization')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Food Items Table
```sql
CREATE TABLE food_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  quantity TEXT NOT NULL,
  expiry_date DATE,
  pickup_location TEXT NOT NULL,
  category TEXT,
  dietary_info TEXT[],
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'requested', 'completed')),
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Food Requests Table
```sql
CREATE TABLE food_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  food_item_id UUID REFERENCES food_items(id),
  requested_by UUID REFERENCES profiles(id),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin)

### Food Items
- `GET /api/food` - Get all food items
- `POST /api/food` - Create new food item
- `GET /api/food/:id` - Get specific food item
- `PUT /api/food/:id` - Update food item
- `DELETE /api/food/:id` - Delete food item
- `POST /api/food/:id/request` - Request a food item

### Health Check
- `GET /` - API status
- `GET /health` - Health check endpoint

## Project Structure

```
bridge-food-connect/
├── config/
│   └── supabase.js          # Supabase client configuration
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── users.js             # User management routes
│   └── food.js              # Food item routes
├── .env.example             # Environment variables template
├── server.js                # Main application entry point
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | No |

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not implemented yet)

### Installing Development Dependencies
```bash
npm install --save-dev nodemon
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue in the GitHub repository.
