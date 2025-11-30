import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const locations = [
    { id: 1, name: "Downtown Center", lat: 40.7128, lng: -74.0060, items: 5 },
    { id: 2, name: "Westside Community", lat: 40.7580, lng: -73.9855, items: 3 },
    { id: 3, name: "East End", lat: 40.7489, lng: -73.9680, items: 7 },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Find Donations Near You
            </h1>
            <p className="text-muted-foreground">
              Explore available items on the map or enable location to find the closest donations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-4 h-[600px] bg-muted/30 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-primary mx-auto" />
                  <div>
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Google Maps Integration
                    </p>
                    <p className="text-muted-foreground mb-4">
                      To enable the interactive map, add your Mapbox API key
                    </p>
                    <Button variant="default" className="shadow-soft">
                      <Navigation className="h-4 w-4 mr-2" />
                      Enable My Location
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold text-foreground mb-4">Nearby Locations</h3>
                <div className="space-y-3">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        selectedLocation === location.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-foreground">{location.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {location.items} items available
                          </p>
                        </div>
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-4 bg-gradient-warm">
                <h3 className="font-semibold text-primary-foreground mb-2">
                  Can't find what you need?
                </h3>
                <p className="text-sm text-primary-foreground/90 mb-3">
                  Our AI assistant can help you discover exactly what you're looking for
                </p>
                <Button variant="secondary" className="w-full">
                  Ask AI Assistant
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MapView;
