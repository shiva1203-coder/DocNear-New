import { Activity } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 glass-card mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center p-6 gap-2 text-center md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium text-muted-foreground">
            © {new Date().getFullYear()} DocNear. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground items-center">
          <Link href="/admin" className="hover:text-primary transition-colors text-primary/70 font-medium">Admin Panel</Link>
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
