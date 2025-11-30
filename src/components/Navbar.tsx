import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* <Link to="/" className="flex items-center space-x-2"> */}
          {/* <Heart className="h-6 w-6 text-primary fill-primary" /> */}
          {/* <span className="font-bold text-xl text-foreground">GiveShare</span> */}
          {/* </Link> */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="GiveShare Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-foreground hover:text-primary transition-colors">
              Browse
            </Link>
            <Link to="/map" className="text-foreground hover:text-primary transition-colors">
              Map
            </Link>
            <Link to="/donate" className="text-foreground hover:text-primary transition-colors">
              Donate
            </Link>
            <Link to="/rider" className="text-foreground hover:text-primary transition-colors">
              Riders
            </Link>
            <Button variant="default" className="shadow-soft">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              to="/browse"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Browse
            </Link>
            <Link
              to="/map"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Map
            </Link>
            <Link
              to="/donate"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Link>
            <Link
              to="/rider"
              className="block text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Riders
            </Link>
            <Button variant="default" className="w-full shadow-soft">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
