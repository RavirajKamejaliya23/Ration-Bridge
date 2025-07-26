import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Utensils, Database, RefreshCw } from 'lucide-react';

const AdminPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFoodItems: 0,
    donorsCount: 0,
    recipientsCount: 0
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Note: In a real app, you'd need proper admin authentication
      // For demo purposes, we'll show what data structure looks like
      
      // Simulate fetching data - in real app this would be admin-only endpoints
      const mockUsers = [
        {
          id: "bf9b35bb-df04-4873-88f6-73e84467285f",
          email: "demouser.verify@gmail.com",
          full_name: "Demo User Test",
          user_type: "donor",
          phone: "555-0123",
          address: "123 Demo Street, Test City",
          created_at: new Date().toISOString(),
          email_confirmed_at: null
        },
        {
          id: "6aa0c98a-14a6-4291-a880-69182b040a52",
          email: "janesmith.demo@gmail.com",
          full_name: "Jane Smith",
          user_type: "donor",
          phone: "555-5678",
          address: "456 Oak Ave",
          created_at: new Date().toISOString(),
          email_confirmed_at: null
        }
      ];

      setUsers(mockUsers);
      
      // Calculate stats
      setStats({
        totalUsers: mockUsers.length,
        totalFoodItems: foodItems.length,
        donorsCount: mockUsers.filter(u => u.user_type === 'donor').length,
        recipientsCount: mockUsers.filter(u => u.user_type === 'recipient').length
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">View all registered users and food donations</p>
            </div>
            <Button onClick={fetchData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Utensils className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Food Items</p>
                    <p className="text-2xl font-bold">{stats.totalFoodItems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Donors</p>
                    <p className="text-2xl font-bold">{stats.donorsCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Database className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Recipients</p>
                    <p className="text-2xl font-bold">{stats.recipientsCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Registered Users
              </CardTitle>
              <CardDescription>
                All users registered in the system (same data visible in Supabase Dashboard → Authentication → Users)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Type</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Phone</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Address</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="border border-gray-200 px-4 py-2 font-medium">
                          {user.full_name}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {user.email}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <Badge variant={user.user_type === 'donor' ? 'default' : 'secondary'}>
                            {user.user_type}
                          </Badge>
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {user.phone || 'N/A'}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          {user.address || 'N/A'}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <Badge variant={user.email_confirmed_at ? 'default' : 'destructive'}>
                            {user.email_confirmed_at ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </td>
                        <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {users.length === 0 && !loading && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No users registered yet.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Food Items Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Food Donations
              </CardTitle>
              <CardDescription>
                All food items donated (same data visible in Supabase Dashboard → Database → Tables → food_items)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {foodItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Utensils className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No food donations yet.</p>
                  <p className="text-sm">Logged-in users can add food donations through the donation page.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {foodItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-2">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <Badge>{item.food_type}</Badge>
                        <span className="font-medium">Qty: {item.quantity}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">📍 {item.location}</p>
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

          {/* Instructions */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">📊 How to View Real Data in Supabase</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. User Registration Data:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Go to: <strong>https://ldajouniuhtpfrvhlwfb.supabase.co</strong></li>
                    <li>Navigate: <strong>Authentication → Users</strong></li>
                    <li>See all registered users with email, metadata, and confirmation status</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">2. Food Donations Data:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Navigate: <strong>Database → Tables → food_items</strong></li>
                    <li>See all food donations with details, quantities, and expiry dates</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. User Profiles (if created):</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Navigate: <strong>Database → Tables → user_profiles</strong></li>
                    <li>See detailed profile information (phone, address, user_type)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
