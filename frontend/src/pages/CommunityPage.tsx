import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Heart, 
  Utensils, 
  Trophy, 
  Target, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Star,
  QrCode,
  Building,
  Rocket
} from 'lucide-react';

const CommunityPage = () => {
  const impactStats = [
    { label: 'Meals Donated', value: '12,847', icon: Utensils, change: '+23%' },
    { label: 'Volunteers Active', value: '1,256', icon: Users, change: '+15%' },
    { label: 'Partner Organizations', value: '89', icon: Building, change: '+8%' },
    { label: 'Food Waste Reduced', value: '45 tons', icon: Target, change: '+31%' },
  ];

  const communityStories = [
    {
      id: 1,
      title: 'Local Restaurant Chain Joins the Movement',
      description: 'GreenBite Restaurant Group commits to donating surplus food daily, helping feed 200+ families weekly.',
      author: 'Sarah Chen, Community Manager',
      date: '2024-01-18',
      location: 'San Francisco, CA',
      impact: '500+ meals donated',
      image: 'photo-1581091226825-a6a2a5aee158',
    },
    {
      id: 2,
      title: 'University Students Bridge Food Gap',
      description: 'UC Berkeley students organize weekly food redistribution events, connecting campus dining surplus with local shelters.',
      author: 'Marcus Rodriguez, Student Volunteer',
      date: '2024-01-15',
      location: 'Berkeley, CA',
      impact: '300+ students helped',
      image: 'photo-1517022812141-23620965515c9',
    },
    {
      id: 3,
      title: 'Tech Company Implements Zero-Waste Policy',
      description: 'InnovateTech partners with local NGOs to ensure no cafeteria food goes to waste, creating a sustainable model.',
      author: 'Jennifer Kim, Sustainability Officer',
      date: '2024-01-12',
      location: 'Palo Alto, CA',
      impact: '1000+ meals saved',
      image: 'photo-1488590528505-98d2b5aba04b',
    },
  ];

  const topVolunteers = [
    { name: 'Maria Gonzalez', pickups: 147, organization: 'City Food Bank' },
    { name: 'David Park', pickups: 132, organization: 'Harvest Hope' },
    { name: 'Lisa Zhang', pickups: 98, organization: 'Community Kitchen' },
    { name: 'Robert Johnson', pickups: 87, organization: 'Meals on Wheels' },
    { name: 'Ana Silva', pickups: 76, organization: 'Youth Outreach' },
  ];

  const futureFeatures = [
    {
      title: 'QR Code Tracking',
      description: 'Advanced tracking system for real-time donation monitoring and impact measurement.',
      icon: QrCode,
      status: 'In Development',
    },
    {
      title: 'AI-Powered Matching',
      description: 'Smart algorithms to optimize donor-volunteer matching based on location and preferences.',
      icon: Target,
      status: 'Coming Soon',
    },
    {
      title: 'Corporate Partnerships',
      description: 'Enterprise solutions for large-scale food waste reduction and community impact.',
      icon: Building,
      status: 'Planned',
    },
    {
      title: 'Mobile App Integration',
      description: 'Native mobile applications for enhanced on-the-go donation and pickup management.',
      icon: Rocket,
      status: 'In Design',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Our Community Impact
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Together, we're building a sustainable future where no food goes to waste and no one goes hungry. 
              See how our community is making a difference, one donation at a time.
            </p>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {impactStats.map((stat, index) => (
              <Card key={stat.label} className="shadow-soft hover:shadow-elevation transition-all duration-300 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Community Stories */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Community Impact Stories</h2>
              <p className="text-muted-foreground">Real stories from our community members making a difference</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {communityStories.map((story, index) => (
                <Card key={story.id} className="shadow-elevation hover:shadow-warm transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="h-48 bg-gradient-subtle rounded-t-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Heart className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-sm">Community Impact</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {story.impact}
                      </Badge>
                      <h3 className="font-semibold text-lg text-foreground line-clamp-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {story.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{story.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{story.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground border-t pt-3">
                        By {story.author}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Volunteer Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-elevation animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-secondary" />
                  <span>Top Volunteers This Month</span>
                </CardTitle>
                <CardDescription>
                  Celebrating our most active community members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVolunteers.map((volunteer, index) => (
                    <div key={volunteer.name} className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-card">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{volunteer.name}</p>
                        <p className="text-sm text-muted-foreground">{volunteer.organization}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">{volunteer.pickups}</p>
                        <p className="text-xs text-muted-foreground">pickups</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elevation animate-slide-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Monthly Progress</span>
                </CardTitle>
                <CardDescription>
                  Our community's growth and impact metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Monthly Donation Goal</span>
                    <span>8,420 / 10,000 meals</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>New Volunteers</span>
                    <span>156 / 200 volunteers</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Partner Organizations</span>
                    <span>89 / 100 partners</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Food Waste Reduction</span>
                    <span>45 / 50 tons</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Future Roadmap */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Future Roadmap</h2>
              <p className="text-muted-foreground">Exciting features and partnerships coming to RationBridge</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {futureFeatures.map((feature, index) => (
                <Card key={feature.title} className="shadow-soft hover:shadow-elevation transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-hero rounded-lg">
                        <feature.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{feature.title}</h3>
                          <Badge variant="outline">{feature.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="shadow-warm bg-gradient-hero text-white animate-fade-in">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Whether you're a food donor, volunteer, or organization, there's a place for you in our mission 
                to end food waste and hunger. Start making an impact today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="hover:scale-105 transition-transform">
                  Become a Volunteer
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 hover:scale-105 transition-all">
                  Partner With Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPage;