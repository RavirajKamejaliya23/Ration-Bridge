# API Testing Commands

This file contains curl commands to test the Bridge Food Connect API endpoints.

## Prerequisites
- Server running on http://localhost:3000
- Supabase configured with proper credentials
- Database tables created using database-setup.sql

## Base URLs
```bash
BASE_URL="http://localhost:3000"
API_BASE="$BASE_URL/api"
```

## Health Check
```bash
# Check if API is running
curl $BASE_URL/

# Health check
curl $BASE_URL/health
```

## Authentication Endpoints

### Register User
```bash
curl -X POST $API_BASE/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "donor@example.com",
    "password": "securepassword123",
    "full_name": "John Donor",
    "user_type": "donor"
  }'
```

### Login User
```bash
curl -X POST $API_BASE/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "donor@example.com",
    "password": "securepassword123"
  }'
```

### Get Current User (requires authentication)
```bash
# Replace YOUR_ACCESS_TOKEN with actual token from login response
curl -X GET $API_BASE/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Logout
```bash
curl -X POST $API_BASE/auth/logout \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## User Profile Endpoints

### Get User Profile
```bash
curl -X GET $API_BASE/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update User Profile
```bash
curl -X PUT $API_BASE/users/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "full_name": "John Updated Donor",
    "phone": "+1234567890",
    "address": "123 Main St, City, State",
    "user_type": "donor"
  }'
```

## Food Item Endpoints

### Get All Food Items
```bash
curl -X GET $API_BASE/food
```

### Create Food Item (requires authentication)
```bash
curl -X POST $API_BASE/food \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Fresh Vegetables",
    "description": "Assorted fresh vegetables from our garden",
    "quantity": "5 bags",
    "expiry_date": "2025-07-30",
    "pickup_location": "123 Garden St, City",
    "category": "vegetables",
    "dietary_info": ["vegetarian", "vegan", "gluten-free"]
  }'
```

### Get Specific Food Item
```bash
# Replace FOOD_ITEM_ID with actual ID
curl -X GET $API_BASE/food/FOOD_ITEM_ID
```

### Update Food Item (owner only)
```bash
curl -X PUT $API_BASE/food/FOOD_ITEM_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Updated Fresh Vegetables",
    "quantity": "3 bags",
    "status": "available"
  }'
```

### Delete Food Item (owner only)
```bash
curl -X DELETE $API_BASE/food/FOOD_ITEM_ID \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Request Food Item
```bash
curl -X POST $API_BASE/food/FOOD_ITEM_ID/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "message": "Hi, I would like to pick up these vegetables for my family. When would be a good time?"
  }'
```

## Example Complete Workflow

### 1. Register a donor
```bash
curl -X POST $API_BASE/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "donor@example.com",
    "password": "password123",
    "full_name": "Jane Donor",
    "user_type": "donor"
  }'
```

### 2. Register a recipient
```bash
curl -X POST $API_BASE/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "recipient@example.com",
    "password": "password123",
    "full_name": "John Recipient",
    "user_type": "recipient"
  }'
```

### 3. Login as donor and save token
```bash
DONOR_TOKEN=$(curl -s -X POST $API_BASE/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "donor@example.com",
    "password": "password123"
  }' | jq -r '.session.access_token')
```

### 4. Create food item as donor
```bash
curl -X POST $API_BASE/food \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DONOR_TOKEN" \
  -d '{
    "title": "Leftover Pizza",
    "description": "Half a large pepperoni pizza, still warm",
    "quantity": "4 slices",
    "pickup_location": "Downtown Office Building",
    "category": "prepared-food"
  }'
```

### 5. Login as recipient
```bash
RECIPIENT_TOKEN=$(curl -s -X POST $API_BASE/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "recipient@example.com",
    "password": "password123"
  }' | jq -r '.session.access_token')
```

### 6. View available food
```bash
curl -X GET $API_BASE/food
```

### 7. Request food item as recipient
```bash
# Use the food item ID from step 6
curl -X POST $API_BASE/food/FOOD_ITEM_ID/request \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $RECIPIENT_TOKEN" \
  -d '{
    "message": "Hi! I would love to pick up this pizza. I can come by in 15 minutes."
  }'
```

## Error Responses

The API returns standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request (validation error)
- 401: Unauthorized (authentication required)
- 403: Forbidden (access denied)
- 404: Not Found
- 500: Internal Server Error

Error response format:
```json
{
  "error": "Error message description"
}
```

## Notes

1. Replace `YOUR_ACCESS_TOKEN` with the actual access token from login responses
2. Replace `FOOD_ITEM_ID` with actual food item UUIDs
3. All authenticated endpoints require the `Authorization: Bearer TOKEN` header
4. Dates should be in ISO format (YYYY-MM-DD)
5. The dietary_info field accepts an array of strings
6. Valid user_type values: "donor", "recipient", "organization"
7. Valid food status values: "available", "requested", "completed", "expired"
