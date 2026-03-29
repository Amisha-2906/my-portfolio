import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <h2 className="text-xl font-display font-medium text-foreground">Loading Portfolio</h2>
      <p className="text-muted-foreground mt-2">Preparing your analytical showcase...</p>
    </div>
  );
}
