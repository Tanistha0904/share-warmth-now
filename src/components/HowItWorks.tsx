import { MapPin, Search, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Browse or List",
    description: "Search for items you need or list what you can share with the community.",
  },
  {
    icon: MapPin,
    title: "Find Nearby",
    description: "Use our map to discover donations close to you or see who needs your help.",
  },
  {
    icon: Heart,
    title: "Connect & Share",
    description: "Coordinate pickup or delivery and make someone's day brighter.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to start making a difference in your community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-8 text-center hover:shadow-soft transition-all duration-300 border-2 hover:border-primary/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-warm mb-6">
                <step.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
