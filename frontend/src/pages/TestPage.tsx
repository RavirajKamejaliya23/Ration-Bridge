import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';
import { AlertCircle, CheckCircle, Plus, Utensils, Users, Heart } from 'lucide-react';

const TestPage = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [newFood, setNewFood] = useState({
    title: '',
    description: '',
    quantity: '',
    expiry_date: '',
    pickup_location: '',
    category: 'prepared',
    dietary_info: ''
  });

  // Test API connectivity
  const runTests = async () => {
    setLoading(true);
    const results = [];

    try {
      // Test 1: API Health
      const healthResponse = await fetch('http://localhost:3000');
      const healthData = await healthResponse.json();
      results.push({
        test: 'API Health Check',
        status: healthResponse.ok,
        message: healthData.message || 'Failed',
        data: healthData
      });

      // Test 2: Food Items Listing
      try {
        const foodResponse = await api.get('/food');
        results.push({
          test: 'Food Items Listing',
          status: true,
          message: `Found ${foodResponse.data.food_items.length} food items`,
          data: foodResponse.data.food_items
        });
        setFoodItems(foodResponse.data.food_items);
      } catch (error: any) {
        results.push({
          test: 'Food Items Listing',
          status: false,
          message: error.message,
          data: null
        });
      }

      // Test 3: User Authentication Status
      results.push({
        test: 'User Authentication',
        status: !!user,
        message: user ? `Logged in as ${user.full_name}` : 'Not logged in',
        data: user
      });

    } catch (error: any) {
      results.push({
        test: 'General API Test',
        status: false,
        message: error.message,
        data: null
      });
    }

    setTestResults(results);
    setLoading(false);
  };

  // Add new food item
  const addFoodItem = async () => {
    if (!user) {
      alert('Please login first to add food items');
      return;
    }

    try {
      const foodData = {
        ...newFood,
        quantity: parseInt(newFood.quantity),
        expiry_date: newFood.expiry_date || null
      };

      const response = await api.post('/food', foodData);
      alert('Food item added successfully!');
      
      // Reset form
      setNewFood({
        title: '',
        description: '',
        quantity: '',
        expiry_date: '',
        pickup_location: '',
        category: 'prepared',
        dietary_info: ''
      });

      // Refresh food items
      runTests();
    } catch (error: any) {
      alert(`Error adding food: ${error.response?.data?.error || error.message}`);
    }
  };

  useEffect(() => {
    runTests();
  }, [user]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">System Testing Dashboard</h1>
            <p className="text-muted-foreground">Test all RationBridge functionality</p>
          </div>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                System Status Tests
              </CardTitle>
              <CardDescription>
                Automated tests to verify all systems are working
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={runTests} disabled={loading} className="mb-4">
                {loading ? 'Running Tests...' : 'Run All Tests'}
              </Button>
              
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    result.status ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {result.status ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      <h3 className="font-semibold">{result.test}</h3>
                    </div>
                    <p className={result.status ? 'text-green-700' : 'text-red-700'}>
                      {result.message}
                    </p>
                    {result.data && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm opacity-70">
                          View Details
                        </summary>
                        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Food Management */}
          {user && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Food Item
                </CardTitle>
                <CardDescription>
                  Test food donation functionality
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Food Name</Label>
                    <Input
                      id="title"
                      value={newFood.title}
                      onChange={(e) => setNewFood(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Fresh Bread"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newFood.quantity}
                      onChange={(e) => setNewFood(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="e.g., 10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Food Type</Label>
                    <Select value={newFood.category} onValueChange={(value) => setNewFood(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prepared">Prepared Food</SelectItem>
                        <SelectItem value="raw">Raw Ingredients</SelectItem>
                        <SelectItem value="packaged">Packaged Food</SelectItem>
                        <SelectItem value="produce">Fresh Produce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry_date">Expiry Date (Optional)</Label>
                    <Input
                      id="expiry_date"
                      type="date"
                      value={newFood.expiry_date}
                      onChange={(e) => setNewFood(prev => ({ ...prev, expiry_date: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="pickup_location">Pickup Location</Label>
                    <Input
                      id="pickup_location"
                      value={newFood.pickup_location}
                      onChange={(e) => setNewFood(prev => ({ ...prev, pickup_location: e.target.value }))}
                      placeholder="e.g., Downtown Restaurant, 123 Main St"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newFood.description}
                      onChange={(e) => setNewFood(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the food item..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="dietary_info">Dietary Information (Optional)</Label>
                    <Input
                      id="dietary_info"
                      value={newFood.dietary_info}
                      onChange={(e) => setNewFood(prev => ({ ...prev, dietary_info: e.target.value }))}
                      placeholder="e.g., Vegetarian, Gluten-free, Contains nuts"
                    />
                  </div>
                </div>

                <Button onClick={addFoodItem} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Food Item
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Current Food Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Available Food Items ({foodItems.length})
              </CardTitle>
              <CardDescription>
                Currently listed food donations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {foodItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Utensils className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No food items available yet.</p>
                  <p className="text-sm">Be the first to donate!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {foodItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span className="font-medium">Qty: {item.quantity}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">📍 {item.pickup_location}</p>
                      {item.dietary_info && (
                        <p className="text-sm text-blue-600">
                          🍽️ {item.dietary_info}
                        </p>
                      )}
                      {item.expiry_date && (
                        <p className="text-sm text-orange-600">
                          Expires: {new Date(item.expiry_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Info */}
          {user && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Current User Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="font-medium">{user.full_name}</p>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <Label>User Type</Label>
                    <p className="font-medium capitalize">{(user as any).user_metadata?.user_type || 'recipient'}</p>
                  </div>
                  <div>
                    <Label>Member Since</Label>
                    <p className="font-medium">
                      {new Date((user as any).created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {!user && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Get Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Please login or register to test food donation functionality
                  </p>
                  <div className="space-x-4">
                    <Button asChild variant="outline">
                      <a href="/login">Login</a>
                    </Button>
                    <Button asChild>
                      <a href="/register">Register</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
