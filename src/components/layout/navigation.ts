import type { Icon } from 'iconsax-reactjs';
import { Box1, Buildings2, Category, ClipboardText, Profile2User } from 'iconsax-reactjs';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: Icon;
}

/** Super Admin dashboard navigation. */
export const navItems: NavItem[] = [
  { id: 'overview', label: 'Dashboard', path: '/', icon: Category },
  { id: 'distributors', label: 'Distributors', path: '/distributors', icon: Buildings2 },
  { id: 'sales-users', label: 'Sales Users', path: '/sales-users', icon: Profile2User },
  { id: 'products', label: 'Products', path: '/products', icon: Box1 },
  { id: 'requests', label: 'Requests', path: '/requests', icon: ClipboardText },
];

export function findNavItem(pathname: string): NavItem | undefined {
  return navItems.find((item) =>
    item.path === '/' ? pathname === '/' : pathname.startsWith(item.path)
  );
}
