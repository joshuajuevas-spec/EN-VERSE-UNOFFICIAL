'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, ArrowRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Link from 'next/link';
import { Card, CardFooter } from '../ui/card';

export function Header() {
  const { toggleSidebar } = useSidebar();
  const notifications: any[] = [];

  const Logo = () => (
     <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
            <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.975.435-.975.975s.435.975.975.975.975-.435.975-.975S9.915 8.25 9.375 8.25Zm3.75 0c-.54 0-.975.435-.975.975s.435.975.975.975.975-.435.975-.975S13.665 8.25 13.125 8.25Zm-5.25 6.375c.245-.244.59-.387.953-.387h3.844c.363 0 .708.143.953.387.351.35.422.89.176 1.304a5.972 5.972 0 0 1-5.902 0c-.246-.414-.175-.954.176-1.304Z" />
        </svg>
      <span className="font-bold text-lg text-foreground">
        EN-VERSE
      </span>
    </div>
  );


  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-8">
        <div className="md:hidden">
            <button onClick={toggleSidebar} className="flex items-center gap-2">
                <span className="sr-only">Toggle Sidebar</span>
                <Logo />
            </button>
        </div>
        <div className="hidden md:flex">
             <Link href="/">
                <Logo />
            </Link>
        </div>

      <div className="w-full flex-1" />
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" asChild>
          <Card>
            <div className="p-4">
              <h4 className="font-medium leading-none">Notifications</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Recent updates from EN-VERSE.
              </p>
            </div>
            <div className="grid gap-2 p-4 pt-0 max-h-80 overflow-y-auto">
              {notifications.slice(0,5).map((notification) => (
                <div
                  key={notification.id}
                  className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {notification.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <CardFooter className="p-2 border-t bg-muted/50">
                <Button asChild variant="link" size="sm" className="w-full">
                    <Link href="/notifications">
                        View All Notifications <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        </PopoverContent>
      </Popover>
    </header>
  );
}
