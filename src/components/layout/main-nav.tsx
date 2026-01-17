
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { LayoutGrid, Library, Sparkles, Github } from 'lucide-react';
import { Button } from '../ui/button';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/content-library', label: 'Content Library', icon: Library },
  { href: '/discover', label: 'Discover', icon: Sparkles },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="h-14 justify-center">
        <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
                <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.975.435-.975.975s.435.975.975.975.975-.435.975-.975S9.915 8.25 9.375 8.25Zm3.75 0c-.54 0-.975.435-.975.975s.435.975.975.975.975-.435.975-.975S13.665 8.25 13.125 8.25Zm-5.25 6.375c.245-.244.59-.387.953-.387h3.844c.363 0 .708.143.953.387.351.35.422.89.176 1.304a5.972 5.972 0 0 1-5.902 0c-.246-.414-.175-.954.176-1.304Z" />
            </svg>
          <span className="font-bold text-lg text-foreground group-data-[state=collapsed]:hidden">
            EN-VERSE
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
                asChild
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="justify-center">
         <Button variant="ghost" className="w-full justify-start gap-2 group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:w-8 group-data-[state=collapsed]:h-8" asChild>
            <Link href="https://github.com/firebase/studio">
                <Github/>
                <span className="group-data-[state=collapsed]:hidden">GitHub</span>
            </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
