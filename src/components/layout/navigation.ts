import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Building2, Users, Package, ClipboardList } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}

/** Super Admin dashboard navigation. */
export const navItems: NavItem[] = [
  { id: 'overview', label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { id: 'distributors', label: 'Distributors', path: '/distributors', icon: Building2 },
  { id: 'sales-users', label: 'Sales Users', path: '/sales-users', icon: Users },
  { id: 'products', label: 'Products', path: '/products', icon: Package },
  { id: 'requests', label: 'Requests', path: '/requests', icon: ClipboardList },
];

export function findNavItem(pathname: string): NavItem | undefined {
  return navItems.find((item) =>
    item.path === '/' ? pathname === '/' : pathname.startsWith(item.path)
  );
}
