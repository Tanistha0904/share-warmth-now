import { useEffect, useState } from "react";
import { MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Rider = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    vehicle: "",
    area: "",
    notes: "",
  });

  const [donations, setDonations] = useState<any[]>([]);

  // Fetch donations after rider registers
  useEffect(() => {
    if (!isRegistered || !formData.area) return;

    const loadDonations = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/rider/donations?area=${formData.area}`
        );
        const data = await res.json();
        setDonations(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    loadDonations();
  }, [isRegistered, formData.area]);


  // Register Rider
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register-rider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsRegistered(true);
        toast({
          title: "Registration Successful!",
          description: data.message,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to register rider",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "Server not responding",
      });
    }
  };

  // Update input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Accept Donation
  const acceptDonation = async (donationId: number) => {
    try {
      const res = await fetch("http://localhost:5000/donations?area=${formData.area}", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationId,
          riderName: formData.name,
          riderContact: formData.phone,
        }),
      });

      const data = await res.json();

      toast({
        title: data.message || "Donation accepted!",
      });
    } catch (error) {
      console.error("Accept donation error:", error);
      toast({
        title: "Error",
        description: "Could not accept donation",
      });
    }
  };

  // ---------------------------------------------------------------------
  // BEFORE REGISTRATION UI
  // ---------------------------------------------------------------------
  if (!isRegistered) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="bg-gradient-hero py-12">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Become a Rider
              </h1>
              <p className="text-muted-foreground text-lg">
                Help deliver kindness and make a difference in your community
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="vehicle">Vehicle Type</Label>
                    <Input
                      id="vehicle"
                      name="vehicle"
                      required
                      value={formData.vehicle}
                      onChange={handleChange}
                      placeholder="Bike, Scooter, Car"
                    />
                  </div>

                  <div>
                    <Label htmlFor="area">Service Area</Label>
                    <Input
                      id="area"
                      name="area"
                      required
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="Downtown, Westside"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Availability or special considerations"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Register as Rider
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ---------------------------------------------------------------------
  // AFTER REGISTRATION UI (DASHBOARD)
  // ---------------------------------------------------------------------

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Rider Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welcome back, {formData.name}!
                </p>
              </div>

              <Badge variant="secondary" className="text-lg px-4 py-2">
                Active Rider
              </Badge>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Available Donations
          </h2>

          <div className="space-y-4">
            {donations.length === 0 ? (
              <p>No donations available yet.</p>
            ) : (
              donations.map((item) => (
                <Card key={item.id} className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Category: {item.category}
                  </p>

                  <p className="mt-2">{item.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {/* Location */}
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm font-medium text-foreground">
                          {item.location}
                        </p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-primary mt-1" />
                      <div>
                        <p className="text-xs text-muted-foreground">Contact</p>
                        <p className="text-sm font-medium text-foreground">
                          {item.contactInfo}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="mt-4"
                    onClick={() => acceptDonation(item.id)}
                  >
                    Accept Donation
                  </Button>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Posted on: {new Date(item.created_at).toLocaleString()}
                  </p>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rider;
