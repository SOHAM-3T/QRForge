import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QrCode, Sun, Moon, Code, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/create', label: 'Create' },
  { path: '/templates', label: 'Templates' },
  { path: '/about', label: 'About' },
];

export function Header() {
  const { resolved, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex size-8 items-center justify-center rounded-lg gradient-primary">
            <QrCode className="size-4.5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            QR<span className="text-primary">Forge</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${resolved === 'dark' ? 'light' : 'dark'} mode`}
          >
            {resolved === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Source Code"
          >
            <Button variant="ghost" size="icon">
              <Code className="size-4" />
            </Button>
          </a>

          <Link to="/create" className="hidden sm:block">
            <Button size="sm" className="gradient-primary border-0 text-white hover:opacity-90">
              Create QR
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="border-t border-border/30 bg-card/95 backdrop-blur-lg md:hidden animate-fade-in" aria-label="Mobile navigation">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  location.pathname === item.path
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
