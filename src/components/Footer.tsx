import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="font-bold text-xl text-foreground">GiveShare</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Building stronger communities through sharing and compassion.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/browse" className="hover:text-primary transition-colors">
                  Browse Donations
                </Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-primary transition-colors">
                  Map View
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-primary transition-colors">
                  Donate Items
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 GiveShare. Built with care for communities in need.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
