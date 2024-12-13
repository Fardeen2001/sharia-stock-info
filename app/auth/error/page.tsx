import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
        <p className="text-muted-foreground mb-6">
          There was a problem signing you in. Please try again.
        </p>
        <Button asChild>
          <Link href="/auth/signin">Back to Sign In</Link>
        </Button>
      </Card>
    </div>
  );
}
