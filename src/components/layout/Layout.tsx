import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

export function Layout() {
  useKeyboardShortcuts();
  return (
    <div className="flex min-h-screen flex-col bg-background transition-theme">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
