import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { foodAPI } from '@/lib/api';
import { Calendar, Clock, MapPin, Package, CheckCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react';

const DonorPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiry_date: '',
    pickup_location: '',
    category: '',
    dietary_info: '',
  });

  const [donations] = useState([
    {
      id: 1,
      foodType: 'Fresh Vegetables',
      quantity: '50 lbs',
      location: 'Downtown Restaurant',
      status: 'Picked Up',
      date: '2024-01-15',
      volunteer: 'Food Bank SF',
    },
    {
      id: 2,
      foodType: 'Baked Goods',
      quantity: '20 items',
      location: 'City Bakery',
      status: 'Pending',
      date: '2024-01-20',
      volunteer: null,
    },
    {
      id: 3,
      foodType: 'Canned Foods',
      quantity: '30 cans',
      location: 'Grocery Store',
      status: 'Expired',
      date: '2024-01-10',
      volunteer: null,
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit food donations",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await foodAPI.createFoodItem(formData);
      
      toast({
        title: "Donation Submitted Successfully!",
        description: "Your food donation has been posted and volunteers will be notified.",
        variant: "default",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        quantity: '',
        expiry_date: '',
        pickup_location: '',
        category: '',
        dietary_info: '',
      });
    } catch (error: any) {
      console.error('Failed to submit donation:', error);
      toast({
        title: "Submission Failed",
        description: error.response?.data?.error || error.message || "Failed to submit donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Picked Up':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'Expired':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Picked Up':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Donate Food & Make an Impact
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your surplus food with those in need. Every donation helps build stronger communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donation Form */}
            <Card className="shadow-elevation animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span>Create New Donation</span>
                </CardTitle>
                <CardDescription>
                  Fill out the details about your food donation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Food Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Fresh vegetables, Baked goods"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the food items, condition, etc."
                      required
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g., 10, 50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select food category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fresh">Fresh Produce</SelectItem>
                          <SelectItem value="prepared">Prepared Meals</SelectItem>
                          <SelectItem value="baked">Baked Goods</SelectItem>
                          <SelectItem value="dairy">Dairy Products</SelectItem>
                          <SelectItem value="canned">Canned/Packaged</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry_date">Expiry Date</Label>
                      <Input
                        id="expiry_date"
                        name="expiry_date"
                        type="date"
                        value={formData.expiry_date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dietary_info">Dietary Info</Label>
                      <Input
                        id="dietary_info"
                        name="dietary_info"
                        value={formData.dietary_info}
                        onChange={handleInputChange}
                        placeholder="e.g., Contains nuts, Gluten-free"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pickup_location">Pickup Location</Label>
                    <Input
                      id="pickup_location"
                      name="pickup_location"
                      value={formData.pickup_location}
                      onChange={handleInputChange}
                      placeholder="Full address or specific location details"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    variant="hero"
                    disabled={submitting || !user}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Submitting Donation...
                      </>
                    ) : !user ? (
                      'Please Log In to Donate'
                    ) : (
                      'Submit Donation'
                    )}
                  </Button>

                  {!user && (
                    <p className="text-sm text-muted-foreground text-center">
                      You need to be logged in to submit food donations.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Donation History */}
            <Card className="shadow-elevation animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Your Donation History</span>
                </CardTitle>
                <CardDescription>
                  Track the impact of your food donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <Card key={donation.id} className="shadow-soft animate-slide-in">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {donation.foodType}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {donation.quantity}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(donation.status)}
                            <Badge className={getStatusColor(donation.status)}>
                              {donation.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{donation.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Posted: {donation.date}</span>
                          </div>
                          {donation.volunteer && (
                            <div className="flex items-center space-x-2">
                              <Package className="h-4 w-4" />
                              <span>Picked up by: <span className="font-medium text-foreground">{donation.volunteer}</span></span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonorPage;
