import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-community.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero -z-10" />
      
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Share What You Have.
              <span className="block text-primary">Help Who Needs.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Connect your unused clothes and extra food with people in your community who need them most. 
              Every contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="shadow-soft group">
                <Link to="/browse">
                  Browse Donations
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/donate">Share Your Items</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img
                src={heroImage}
                alt="Community sharing and helping each other"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary rounded-full blur-3xl opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
