import { QrCode, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-md gradient-primary">
              <QrCode className="size-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              QR<span className="text-primary">Forge</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Footer navigation">
            <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
            <Link to="/create" className="transition-colors hover:text-foreground">Create</Link>
            <Link to="/templates" className="transition-colors hover:text-foreground">Templates</Link>
            <Link to="/about" className="transition-colors hover:text-foreground">About</Link>
          </nav>

          {/* Credits */}
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="size-3 fill-primary text-primary" /> Privacy-first
          </p>
        </div>

        <div className="mt-6 border-t border-border/30 pt-4 text-center">
          <p className="text-xs text-muted-foreground/60">
            All QR code generation happens locally in your browser. No data is ever sent to a server.
          </p>
        </div>
      </div>
    </footer>
  );
}
