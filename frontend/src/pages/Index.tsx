import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Utensils, 
  Users, 
  ArrowRight, 
  Heart, 
  MapPin, 
  Clock,
  Target,
  Recycle,
  Building,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const problemSolutions = [
    {
      problem: 'Food Waste',
      description: '40% of food produced globally goes to waste while millions face hunger.',
      icon: Recycle,
      color: 'text-red-600',
    },
    {
      problem: 'Hunger Crisis',
      description: '1 in 8 people worldwide struggle with food insecurity daily.',
      icon: Heart,
      color: 'text-orange-600',
    },
    {
      problem: 'Lack of Connection',
      description: 'No efficient system to connect food donors with those in need.',
      icon: Users,
      color: 'text-blue-600',
    },
  ];

  const howItWorksSteps = [
    {
      title: 'For Donors',
      steps: [
        { text: 'List surplus food with details', icon: Utensils },
        { text: 'Set pickup location and time', icon: MapPin },
        { text: 'Connect with verified volunteers', icon: Users },
      ],
    },
    {
      title: 'For Volunteers & NGOs',
      steps: [
        { text: 'Browse available donations nearby', icon: Target },
        { text: 'Claim pickups that match capacity', icon: CheckCircle },
        { text: 'Deliver to communities in need', icon: Heart },
      ],
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Restaurant Owner',
      text: 'RationBridge transformed how we handle surplus food. Now every leftover meal finds a home.',
      rating: 5,
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Volunteer Coordinator',
      text: 'The platform makes food redistribution incredibly efficient. We\'ve helped 500+ families this month.',
      rating: 5,
    },
    {
      name: 'Dr. Jennifer Kim',
      role: 'Food Bank Director',
      text: 'This solution addresses the real gap in our food system. It\'s exactly what our community needed.',
      rating: 5,
    },
  ];

  const impactStats = [
    { number: '12,847', label: 'Meals Donated', icon: Utensils },
    { number: '1,256', label: 'Active Volunteers', icon: Users },
    { number: '89', label: 'Partner Organizations', icon: Building },
    { number: '45 tons', label: 'Food Waste Reduced', icon: Recycle },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Bridging Food Waste and Hunger
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Connect surplus food donors with NGOs and volunteers to create a sustainable, 
              hunger-free community. Every meal matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Button asChild size="lg" variant="secondary" className="group">
                <Link to="/donate">
                  Donate Food
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/volunteer">
                  Find Donations
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The Challenge We're Solving
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Food waste and hunger coexist in our communities. RationBridge creates the missing connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {problemSolutions.map((item, index) => (
              <Card key={item.problem} className="shadow-soft hover:shadow-elevation transition-all duration-300 animate-slide-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="mx-auto w-16 h-16 bg-gradient-subtle rounded-full flex items-center justify-center">
                      <item.icon className={`h-8 w-8 ${item.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.problem}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Solution Statement */}
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-4">
              <Target className="h-5 w-5" />
              <span className="font-semibold">Our Solution</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              A Digital Bridge for Food Redistribution
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              RationBridge connects food donors directly with volunteers and NGOs, creating an efficient, 
              transparent, and impactful system for food redistribution in your community.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How RationBridge Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, efficient, and impactful food redistribution in three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {howItWorksSteps.map((section, sectionIndex) => (
              <Card key={section.title} className="shadow-elevation animate-slide-in" style={{ animationDelay: `${sectionIndex * 200}ms` }}>
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full font-semibold">
                        {stepIndex + 1}
                      </div>
                      <div className="flex items-center space-x-3 flex-1">
                        <step.icon className="h-5 w-5 text-primary" />
                        <span className="text-foreground">{step.text}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Community Impact
            </h2>
            <p className="text-xl text-muted-foreground">
              Real numbers, real impact, real change in our communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <Card key={stat.label} className="shadow-soft hover:shadow-elevation transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-foreground">{stat.number}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-muted-foreground">
              Stories from donors, volunteers, and organizations making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="shadow-elevation animate-slide-in" style={{ animationDelay: `${index * 150}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-warm bg-gradient-hero text-white animate-fade-in">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Join thousands of community members who are already making an impact. 
                Whether you have food to donate or want to help with distribution, 
                there's a place for you in our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="group">
                  <Link to="/donate">
                    Start Donating
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/volunteer">
                    Become a Volunteer
                    <Users className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;