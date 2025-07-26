import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { MessageSquare, Clock, CheckCircle, XCircle, Users, Utensils } from 'lucide-react';

const FoodRequestsPage = () => {
  const { user } = useAuth();
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    if (user) {
      fetchFoodItems();
      fetchAllRequests();
    }
  }, [user]);

  const fetchFoodItems = async () => {
    try {
      const response = await api.get('/food');
      setFoodItems(response.data.food_items);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const fetchAllRequests = async () => {
    try {
      const response = await api.get('/food/requests');
      setRequests(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const submitRequest = async (foodItemId: string) => {
    if (!user) {
      alert('Please login to request food');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/food/${foodItemId}/request`, {
        message: requestMessage
      });
      
      alert('Food request submitted successfully!');
      setRequestMessage('');
      setSelectedItem(null);
      
      // Refresh requests
      await fetchAllRequests();
    } catch (error: any) {
      alert(`Error submitting request: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Food Requests</h1>
            <p className="text-muted-foreground mb-8">Please login to view and manage food requests</p>
            <div className="space-x-4">
              <Button asChild variant="outline">
                <a href="/login">Login</a>
              </Button>
              <Button asChild>
                <a href="/register">Register</a>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Food Requests Dashboard</h1>
            <p className="text-muted-foreground">Manage food requests and donations</p>
          </div>

          {/* Storage Information */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">📊 Where Food Requests Are Stored</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">🗄️ Database Storage:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Table:</strong> <code>food_requests</code> in your Supabase database</li>
                    <li><strong>Location:</strong> Database → Tables → food_requests</li>
                    <li><strong>URL:</strong> https://ldajouniuhtpfrvhlwfb.supabase.co</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">📋 Request Data Structure:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>id:</strong> Unique request identifier</li>
                    <li><strong>food_item_id:</strong> Link to the requested food item</li>
                    <li><strong>requested_by:</strong> User who made the request</li>
                    <li><strong>message:</strong> Optional message from requester</li>
                    <li><strong>status:</strong> pending, approved, rejected, or completed</li>
                    <li><strong>created_at:</strong> When the request was made</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">🔌 API Endpoints:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Submit Request:</strong> POST /api/food/:id/request</li>
                    <li><strong>View All Requests:</strong> GET /api/food/requests</li>
                    <li><strong>View Item Requests:</strong> GET /api/food/:id/requests</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Food Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Available Food Items
              </CardTitle>
              <CardDescription>
                Click "Request" to submit a food request
              </CardDescription>
            </CardHeader>
            <CardContent>
              {foodItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Utensils className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No food items available yet.</p>
                  <p className="text-sm">Check back later or <a href="/test" className="text-primary underline">add some food items</a>.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {foodItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex justify-between items-center text-sm">
                        <Badge variant="secondary">{item.category}</Badge>
                        <span className="font-medium">Qty: {item.quantity}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">📍 {item.pickup_location}</p>
                      
                      {selectedItem?.id === item.id ? (
                        <div className="space-y-3">
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            value={requestMessage}
                            onChange={(e) => setRequestMessage(e.target.value)}
                            placeholder="Add a message with your request..."
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => submitRequest(item.id)}
                              disabled={loading}
                              size="sm"
                              className="flex-1"
                            >
                              {loading ? 'Submitting...' : 'Submit Request'}
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setSelectedItem(null)}
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => setSelectedItem(item)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Request This Food
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Food Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                All Food Requests ({requests.length})
              </CardTitle>
              <CardDescription>
                All food requests in the system (same data stored in Supabase → food_requests table)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No food requests yet.</p>
                  <p className="text-sm">Submit a request above to see it appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">
                          Request for: {request.food_items?.title || 'Unknown Item'}
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Requested by:</strong> {request.profiles?.full_name || 'Unknown User'}
                        </div>
                        <div>
                          <strong>Phone:</strong> {request.profiles?.phone || 'Not provided'}
                        </div>
                        <div>
                          <strong>User Type:</strong> {request.profiles?.user_type || 'Unknown'}
                        </div>
                        <div>
                          <strong>Request Date:</strong> {new Date(request.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      {request.message && (
                        <div className="bg-gray-50 p-3 rounded">
                          <strong>Message:</strong> {request.message}
                        </div>
                      )}

                      {request.food_items && (
                        <div className="bg-blue-50 p-3 rounded">
                          <strong>Food Details:</strong>
                          <div className="text-sm mt-1">
                            <div><strong>Description:</strong> {request.food_items.description}</div>
                            <div><strong>Quantity:</strong> {request.food_items.quantity}</div>
                            <div><strong>Location:</strong> {request.food_items.pickup_location}</div>
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        Request ID: {request.id}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Database Instructions */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">🔍 How to Check Food Requests in Supabase</CardTitle>
            </CardHeader>
            <CardContent className="text-green-700">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">📊 Direct Database Access:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Go to: <strong>https://ldajouniuhtpfrvhlwfb.supabase.co</strong></li>
                    <li>Navigate to: <strong>Database → Tables</strong></li>
                    <li>Click on: <strong>food_requests</strong> table</li>
                    <li>View all submitted food requests with full details</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">🔗 Related Tables:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>food_items:</strong> The food being requested</li>
                    <li><strong>profiles:</strong> User information for requesters</li>
                    <li><strong>food_requests:</strong> The actual request records</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">📈 Request Status Flow:</h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    <span>→</span>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    <span>→</span>
                    <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
                  </div>
                  <div className="mt-2 text-xs">
                    Or: <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FoodRequestsPage;
