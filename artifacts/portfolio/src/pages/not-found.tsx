import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <h1 className="text-8xl font-display font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-6">Page not found</h2>
      <p className="text-muted-foreground mb-8 max-w-md text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors">
        Return to Portfolio
      </Link>
    </div>
  );
}
