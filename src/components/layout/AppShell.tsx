import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronRight, LogOut, Menu, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout, selectUser } from '../../store/slices/authSlice';
import { navItems, findNavItem } from './navigation';
import { Avatar } from '../ui/Avatar';

/** Super Admin dashboard shell: sidebar nav + sticky topbar + routed content. */
export function AppShell() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = findNavItem(location.pathname);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] flex font-sans">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-[240px] shrink-0 flex-col bg-[#FBFBFB] border-r border-[#D9D9D9] h-screen sticky top-0 z-30">
        <div className="h-[58px] border-b border-[#D9D9D9]/80 flex items-center px-5 gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#EA4335] flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#171717] leading-tight">KIB Sales Admin</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Super Admin</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overscroll-contain kib-scroll">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#F3F3F3] text-[#171717] font-semibold border border-slate-200/50'
                      : 'text-[#171717] hover:bg-slate-100/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-[#171717] opacity-60" />
                <span className="text-[13px] font-semibold">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#D9D9D9]/80 bg-[#FBFBFB]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 hover:bg-rose-50/50 text-slate-600 hover:text-rose-600 text-xs font-semibold rounded-lg transition-all cursor-pointer bg-white"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[58px] bg-[#FBFBFB] border-b border-[#D9D9D9]/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-1.5 text-sm">
            <span className="text-[#737373] tracking-tight">Sales Force Automation</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#D4D4D4]" />
            <span className="text-[#313131] font-medium tracking-tight">{active?.label ?? ''}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-[#171717] leading-none">{user?.fullName}</p>
              <p className="text-[10px] text-slate-400">{user?.email}</p>
            </div>
            <Avatar name={user?.fullName} size="sm" />
            <button
              className="md:hidden p-1 text-slate-500 hover:text-slate-900 ml-1 cursor-pointer"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {mobileOpen && (
          <nav className="md:hidden bg-[#FBFBFB] border-b border-[#D9D9D9]/80 px-4 py-3 space-y-1 z-30">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold cursor-pointer ${
                      isActive ? 'bg-slate-100 text-[#171717]' : 'text-slate-600'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 opacity-60" />
                  {item.label}
                </NavLink>
              );
            })}
            <div className="pt-2 border-t border-slate-200 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 text-rose-600 bg-rose-50 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </nav>
        )}

        <main className="flex-grow overflow-y-auto p-6 md:p-8 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
