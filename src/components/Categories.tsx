import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clothesIcon from "@/assets/clothes-icon.png";
import foodIcon from "@/assets/food-icon.png";

const categories = [
  {
    name: "Clothes & Apparel",
    description: "Donate or find clothes, sweaters, jackets, and more",
    image: clothesIcon,
    link: "/browse?category=clothes",
    stats: "500+ items available",
  },
  {
    name: "Food & Meals",
    description: "Share extra food or find fresh meals in your area",
    image: foodIcon,
    link: "/browse?category=food",
    stats: "200+ listings today",
  },
];

const Categories = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What You Can Share
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From warm clothes to nutritious meals, every contribution helps build a stronger community
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="overflow-hidden group hover:shadow-card transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{category.stats}</span>
                  <Button asChild variant="default" className="shadow-soft">
                    <Link to={category.link}>Browse</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
