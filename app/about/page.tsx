import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <Card className="p-8 space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg">
              Sharia Stock Info is dedicated to providing reliable information
              and guidance about Shariah-compliant investments. Our mission is
              to help Muslims make informed investment decisions that align with
              Islamic principles.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              We strive to educate and empower our community about halal
              investing opportunities while maintaining the highest standards of
              Islamic finance principles.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/Fardeen2001"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/fardeen-ahamed/"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:fardeenahamed2001@gmail.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
