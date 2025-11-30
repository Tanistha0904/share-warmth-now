import { useState } from "react";
import { Search, MapPin, Filter, Phone, MessageCircle, Truck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const mockDonations = [
  {
    id: 1,
    title: "Winter Jackets - Size M/L",
    category: "clothes",
    location: "Downtown",
    distance: "0.5 mi",
    description: "3 warm winter jackets in great condition",
    postedDate: "2 hours ago",
  },
  {
    id: 2,
    title: "Fresh Vegetables & Fruits",
    category: "food",
    location: "Westside",
    distance: "1.2 mi",
    description: "Organic produce, must pick up today",
    postedDate: "1 hour ago",
  },
  {
    id: 3,
    title: "Children's Sweaters",
    category: "clothes",
    location: "East End",
    distance: "2.1 mi",
    description: "Assorted kids sweaters, ages 5-10",
    postedDate: "5 hours ago",
  },
  {
    id: 4,
    title: "Prepared Meals",
    category: "food",
    location: "Central",
    distance: "0.8 mi",
    description: "Home-cooked meals, ready to eat",
    postedDate: "3 hours ago",
  },
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<typeof mockDonations[0] | null>(null);

  const handleContactClick = (donation: typeof mockDonations[0]) => {
    setSelectedDonation(donation);
    setContactDialogOpen(true);
  };

  const handleWhatsAppContact = () => {
    if (!selectedDonation) return;
    const message = encodeURIComponent(
      `Hi! I'm interested in "${selectedDonation.title}" from GiveShare. Is it still available?`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const handlePhoneContact = () => {
    window.open('tel:+1234567890', '_blank');
  };

  const handleRiderPickup = () => {
    window.location.href = '/rider';
  };

  const filteredDonations = mockDonations.filter((donation) => {
    const matchesSearch = donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || donation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Browse Available Donations
            </h1>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "clothes" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("clothes")}
              >
                Clothes
              </Button>
              <Button
                variant={selectedCategory === "food" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("food")}
              >
                Food
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((donation) => (
              <Card key={donation.id} className="p-6 hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant={donation.category === "food" ? "default" : "secondary"}>
                    {donation.category === "food" ? "Food" : "Clothes"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{donation.postedDate}</span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {donation.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {donation.description}
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {donation.location} · {donation.distance}
                </div>
                
                <Button 
                  className="w-full shadow-soft"
                  onClick={() => handleContactClick(donation)}
                >
                  Contact Donor
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Donor</DialogTitle>
            <DialogDescription>
              Choose how you'd like to contact the donor about "{selectedDonation?.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-3 mt-4">
            <Button
              size="lg"
              className="w-full gap-2"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-5 w-5" />
              Contact via WhatsApp
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="w-full gap-2"
              onClick={handlePhoneContact}
            >
              <Phone className="h-5 w-5" />
              Call Donor
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              size="lg"
              variant="secondary"
              className="w-full gap-2"
              onClick={handleRiderPickup}
            >
              <Truck className="h-5 w-5" />
              Request Rider Pickup & Delivery
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Please be respectful and confirm availability before pickup
          </p>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Browse;
