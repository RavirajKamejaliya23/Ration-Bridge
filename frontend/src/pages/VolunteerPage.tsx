import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { foodAPI } from '@/lib/api';
import { MapPin, Clock, Package, Filter, Map, List, CheckCircle, ArrowRight, Loader2, RefreshCw } from 'lucide-react';

const VolunteerPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    distance: '',
    foodType: '',
    urgency: '',
  });

  const [availableDonations, setAvailableDonations] = useState([]);
  const [pickupHistory, setPickupHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingIds, setClaimingIds] = useState(new Set());

  // Function to fetch donations (extracted for reuse)
  const fetchDonations = async () => {
    try {
      setLoading(true);
      console.log('Fetching donations from API...');
      const response = await foodAPI.getFoodItems();
      console.log('API response:', response.data);
      
      if (response.data.success || response.data.food_items) {
        // Transform backend data to match frontend structure
        let foodItems = response.data.food_items || [];
        
        console.log('Received food items:', foodItems);
        
        const transformedDonations = foodItems.map((item: any) => ({
          id: item.id,
          foodType: item.title,
          quantity: `${item.quantity} ${item.quantity > 1 ? 'items' : 'item'}`,
          location: item.pickup_location,
          distance: 'Calculating...', // You could add geolocation calculation here
          expiryTime: new Date(item.expiry_date).toLocaleDateString(),
          urgency: getUrgencyFromDate(item.expiry_date),
          pickupWindow: 'Contact donor', // Could be enhanced with pickup time field
          donor: item.profiles?.full_name || 'Anonymous Donor',
          description: item.description,
          category: item.category,
          dietary_info: item.dietary_info,
          created_at: item.created_at,
        }));
        
        console.log('Transformed donations:', transformedDonations);
        setAvailableDonations(transformedDonations);
      }
    } catch (error) {
      console.error('Failed to fetch donations:', error);
      toast({
        title: "Error",
        description: "Failed to load available donations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch available food items from backend
  useEffect(() => {
    fetchDonations();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchDonations, 30000);
    return () => clearInterval(interval);
  }, [toast]);

  // Helper function to determine urgency based on expiry date
  const getUrgencyFromDate = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffHours = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 24) return 'High';
    if (diffHours < 72) return 'Medium';
    return 'Low';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClaimPickup = async (donationId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to claim food pickups",
        variant: "destructive",
      });
      return;
    }

    try {
      setClaimingIds(prev => new Set([...prev, donationId]));
      
      const requestData = {
        message: "I would like to claim this food pickup for distribution to those in need.",
        contact_info: user.email,
        pickup_notes: "Will coordinate pickup time with donor"
      };

      const response = await foodAPI.requestFood(donationId.toString(), requestData);
      
      if (response.data.success) {
        toast({
          title: "Pickup Claimed Successfully!",
          description: "The donor will be notified. Check your email for pickup details.",
          variant: "default",
        });

        // Remove the claimed item from available donations
        setAvailableDonations(prev => 
          prev.filter((donation: any) => donation.id !== donationId)
        );

        // Add to pickup history (you could fetch this from backend instead)
        const claimedItem = availableDonations.find((d: any) => d.id === donationId);
        if (claimedItem) {
          setPickupHistory(prev => [{
            id: Date.now(), // temporary ID
            foodType: claimedItem.foodType,
            quantity: claimedItem.quantity,
            donor: claimedItem.donor,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending Pickup',
            recipient: 'To be distributed',
          }, ...prev]);
        }
      } else {
        throw new Error(response.data.message || 'Failed to claim pickup');
      }
    } catch (error: any) {
      console.error('Failed to claim pickup:', error);
      toast({
        title: "Claim Failed",
        description: error.response?.data?.error || error.message || "Failed to claim pickup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setClaimingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(donationId);
        return newSet;
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Find Food Donations
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with local food donors and help redistribute surplus food to those in need.
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-primary" />
                <span>Filter Donations</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="distance">Distance</Label>
                  <Select value={filters.distance} onValueChange={(value) => setFilters({...filters, distance: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select distance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Within 1 mile</SelectItem>
                      <SelectItem value="3">Within 3 miles</SelectItem>
                      <SelectItem value="5">Within 5 miles</SelectItem>
                      <SelectItem value="10">Within 10 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="foodType">Food Type</Label>
                  <Select value={filters.foodType} onValueChange={(value) => setFilters({...filters, foodType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select food type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                      <SelectItem value="baked">Baked Goods</SelectItem>
                      <SelectItem value="prepared">Prepared Meals</SelectItem>
                      <SelectItem value="dairy">Dairy Products</SelectItem>
                      <SelectItem value="canned">Canned Foods</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select value={filters.urgency} onValueChange={(value) => setFilters({...filters, urgency: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <List className="h-4 w-4" />
                <span>List View</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center space-x-2">
                <Map className="h-4 w-4" />
                <span>Map View</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Available Donations */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Available Donations</h2>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={fetchDonations}
                      disabled={loading}
                      className="flex items-center space-x-2"
                    >
                      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {loading ? (
                      <Card className="shadow-soft">
                        <CardContent className="p-6 text-center">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                          <p className="text-muted-foreground">Loading available donations...</p>
                        </CardContent>
                      </Card>
                    ) : availableDonations.length === 0 ? (
                      <Card className="shadow-soft">
                        <CardContent className="p-6 text-center">
                          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-semibold mb-2">No Donations Available</h3>
                          <p className="text-muted-foreground">
                            There are currently no food donations available for pickup. Check back later!
                          </p>
                        </CardContent>
                      </Card>
                    ) : (
                      availableDonations.map((donation: any) => (
                        <Card key={donation.id} className="shadow-soft hover:shadow-elevation transition-all duration-300 animate-slide-in">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-lg text-foreground">
                                  {donation.foodType}
                                </h3>
                                <p className="text-muted-foreground">{donation.quantity}</p>
                                {donation.description && (
                                  <p className="text-sm text-muted-foreground mt-1">{donation.description}</p>
                                )}
                              </div>
                              <Badge className={getUrgencyColor(donation.urgency)}>
                                {donation.urgency} Urgency
                              </Badge>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>{donation.location}</span>
                                <span className="text-primary font-medium">({donation.distance})</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>Pickup: {donation.pickupWindow}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Package className="h-4 w-4" />
                                <span>Expires: {donation.expiryTime}</span>
                              </div>
                              {donation.dietary_info && (
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <span className="font-medium">Dietary Info:</span>
                                  <span>{donation.dietary_info}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                From: <span className="font-medium text-foreground">{donation.donor}</span>
                              </span>
                              {user ? (
                                <Button 
                                  variant="hero" 
                                  onClick={() => handleClaimPickup(donation.id)}
                                  disabled={claimingIds.has(donation.id)}
                                  className="group"
                                >
                                  {claimingIds.has(donation.id) ? (
                                    <>
                                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                      Claiming...
                                    </>
                                  ) : (
                                    <>
                                      Claim Pickup
                                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform ml-2" />
                                    </>
                                  )}
                                </Button>
                              ) : (
                                <Button variant="outline" disabled>
                                  Login to Claim
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>

                {/* Pickup History */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Your Pickup History</h2>
                  <div className="space-y-4">
                    {pickupHistory.map((pickup) => (
                      <Card key={pickup.id} className="shadow-soft animate-slide-in">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {pickup.foodType}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {pickup.quantity}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <Badge className="bg-green-100 text-green-800">
                                {pickup.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>From: <span className="font-medium text-foreground">{pickup.donor}</span></p>
                            <p>Delivered to: <span className="font-medium text-foreground">{pickup.recipient}</span></p>
                            <p>Date: {pickup.date}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map">
              <Card className="shadow-elevation">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center h-96 bg-gradient-subtle rounded-lg border-2 border-dashed border-border">
                    <div className="text-center">
                      <Map className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Interactive Map View
                      </h3>
                      <p className="text-muted-foreground">
                        Map functionality would be integrated here with markers showing donation locations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default VolunteerPage;