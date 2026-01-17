'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Search, User as UserIcon, Users, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/firebase';

export function BottomNav() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();

  const navItems = [
    { href: '/', label: 'Home', icon: LayoutGrid },
    { href: '/members', label: 'Members', icon: Users },
    { href: '/search', label: 'Search', icon: Search },
    // Dynamically change the profile/login tab
    ...(isUserLoading ? [] : user 
      ? [{ href: '/profile', label: 'Profile', icon: UserIcon }] 
      : [{ href: '/login', label: 'Login', icon: LogIn }]),
  ];

  if (!isMobile) {
    return null;
  }

  // Prevents flash of login button on load
  if (isUserLoading) {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background/95 backdrop-blur-sm border-t border-border/50 md:hidden">
        </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background/95 backdrop-blur-sm border-t border-border/50 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = (item.href === '/' && pathname === '/') || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
