import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Donate = () => {
  const { toast } = useToast();

  // 🔹 NEW LOGIN/SIGNUP STATE
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  // 🔹 DONATION FORM STATE (Your old code)
  const [formData, setFormData] = useState({
    title: "",
    category: "clothes",
    description: "",
    location: "",
    contactInfo: "",
  });

  // 🔹 Handle donation input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Handle login/signup input change
  const handleAuthChange = (e: any) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  // 🔹 LOGIN / SIGNUP FUNCTION
  const handleAuth = async () => {
    const url = isLogin
      ? "http://localhost:5000/rider/login"
      : "http://localhost:5000/rider/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authForm),
    });

    const data = await response.json();

    if (response.ok) {
      toast({ title: data.message || "Logged in!" });
      setUser(data.rider || { name: authForm.name, phone: authForm.phone });
    } else {
      toast({ title: "Error", description: data.message });
    }
  };

  // 🔹 SHOW LOGIN/SIGNUP BEFORE DONATION FORM
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? "Login to Donate" : "Create Donor Account"}
            </h2>

            {!isLogin && (
              <div className="mb-3">
                <Label>Your Name</Label>
                <Input
                  name="name"
                  value={authForm.name}
                  onChange={handleAuthChange}
                />
              </div>
            )}

            <div className="mb-3">
              <Label>Phone Number</Label>
              <Input
                name="phone"
                value={authForm.phone}
                onChange={handleAuthChange}
              />
            </div>

            <div className="mb-3">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={authForm.password}
                onChange={handleAuthChange}
              />
            </div>

            <Button onClick={handleAuth} className="w-full mt-2">
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <p
              className="text-center mt-4 text-blue-600 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "New user? Create an account"
                : "Already have an account? Login"}
            </p>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  // ----------------------------------------------------
  // 🔹 IF LOGGED IN → SHOW DONATION FORM (YOUR OLD CODE)
  // ----------------------------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/add-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    toast({
      title: "Donation Submitted!",
      description: data.message,
    });

    setFormData({
      title: "",
      category: "clothes",
      description: "",
      location: "",
      contactInfo: "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="bg-gradient-hero py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Share Your Items
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Your unused items can make a real difference.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-2">
                  <Label>Item Title *</Label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="clothes">Clothes</option>
                    <option value="food">Food</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location *</Label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contact Info *</Label>
                  <Input
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button className="w-full" type="submit">
                  Submit Donation
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
