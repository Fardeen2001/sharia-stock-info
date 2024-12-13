import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, BookOpen } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Market Analysis",
    description: "Expert analysis of Shariah-compliant stocks and market trends."
  },
  {
    icon: Shield,
    title: "Halal Screening",
    description: "Rigorous screening process to ensure Shariah compliance."
  },
  {
    icon: BookOpen,
    title: "Educational Resources",
    description: "Comprehensive guides on Islamic investing principles."
  }
];

export function FeatureSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 space-y-4">
              <feature.icon className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}