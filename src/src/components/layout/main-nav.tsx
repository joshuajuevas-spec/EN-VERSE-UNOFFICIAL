
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
import { LayoutGrid, Search, Github, User, Users } from 'lucide-react';
import { Button } from '../ui/button';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutGrid },
  { href: '/members', label: 'Members', icon: Users },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/profile', label: 'My', icon: User },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="h-14 justify-center">
        {/* Logo has been moved to the Header component */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href) && (item.href !== '/' || pathname === '/')}
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
