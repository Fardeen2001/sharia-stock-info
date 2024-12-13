import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Ethical Investing the Islamic Way
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover Shariah-compliant investment opportunities and make informed decisions aligned with Islamic principles.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/stocks">View Halal Stocks</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Read Our Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}