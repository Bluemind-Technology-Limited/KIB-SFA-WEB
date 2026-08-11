import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight2, ArrowLeft2, Logout, Menu, CloseCircle } from 'iconsax-reactjs';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout, selectUser } from '../../store/slices/authSlice';
import { navItems, findNavItem } from './navigation';
import { Avatar } from '../ui/Avatar';
import { Tooltip } from '../ui/Tooltip';

/** Super Admin dashboard shell: collapsible sidebar + sticky topbar + routed content. */
export function AppShell() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem('kib-sfa-sb-collapsed') === '1'
  );

  const active = findNavItem(location.pathname);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('kib-sfa-sb-collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  const toggleCollapsed = () => setCollapsed((v) => !v);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const sidebarWidth = collapsed ? 'w-[64px]' : 'w-[240px]';

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#171717] flex font-sans">
      {/* Sidebar (desktop) */}
      <aside
        className={`hidden md:flex ${sidebarWidth} shrink-0 flex-col bg-[#FBFBFB] border-r border-[#D9D9D9] h-screen sticky top-0 z-30 transition-[width] duration-200`}
      >
        <div
          className={`h-[58px] border-b border-[#D9D9D9]/80 flex items-center justify-between px-3 gap-1 ${
            collapsed ? 'px-2' : 'px-4'
          }`}
        >
          <div className={`flex items-center gap-2.5 min-w-0 ${collapsed ? 'justify-center w-full' : ''}`}>
            <img
              src="/kib-group.png"
              alt="KIB Group"
              className="h-8 w-auto object-contain shrink-0"
            />
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-[#171717] leading-tight truncate">KIB Admin</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Super Admin</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={toggleCollapsed}
              aria-label="Collapse sidebar"
              title="Collapse sidebar"
              className="text-slate-400 hover:text-[#171717] transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeft2 size={16} />
            </button>
          )}
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
                  `w-full flex items-center justify-center py-2 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#FDEDEB] text-[#EA4335] border border-[#EA4335]/30'
                      : 'text-[#171717] hover:bg-[#FDF0EE] hover:text-[#EA4335]'
                  } ${collapsed ? '' : 'gap-3 px-3 justify-start'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {collapsed ? (
                      <Tooltip content={item.label} side="right">
                        <Icon
                          size={18}
                          variant={isActive ? 'Bold' : 'Linear'}
                          className={isActive ? 'text-[#EA4335]' : 'text-[#171717]'}
                        />
                      </Tooltip>
                    ) : (
                      <>
                        <Icon
                          size={18}
                          variant={isActive ? 'Bold' : 'Linear'}
                          className={isActive ? 'text-[#EA4335]' : 'text-[#171717]'}
                        />
                        <span className="text-[13px] font-semibold">{item.label}</span>
                      </>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#D9D9D9]/80 bg-[#FBFBFB]">
          <Tooltip content="Sign Out" side="right">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 hover:bg-rose-50/50 text-slate-600 hover:text-rose-600 text-xs font-semibold rounded-lg transition-all cursor-pointer bg-white`}
            >
              <Logout size={15} />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </Tooltip>
        </div>
      </aside>

      {/* Main panel */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[58px] bg-[#FBFBFB] border-b border-[#D9D9D9]/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-2">
            {collapsed && (
              <button
                onClick={toggleCollapsed}
                aria-label="Expand sidebar"
                title="Expand sidebar"
                className="hidden md:inline-flex p-1 text-slate-400 hover:text-[#171717] transition-colors cursor-pointer"
              >
                <ArrowRight2 size={18} />
              </button>
            )}
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-[#737373] tracking-tight">Sales Force Automation</span>
              <ArrowRight2 size={14} className="text-[#D4D4D4]" />
              <span className="text-[#313131] font-medium tracking-tight">{active?.label ?? ''}</span>
            </div>
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
              {mobileOpen ? <CloseCircle size={20} /> : <Menu size={20} />}
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
                    isActive ? 'bg-[#FDEDEB] text-[#EA4335]' : 'text-slate-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={16}
                      variant={isActive ? 'Bold' : 'Linear'}
                      className={isActive ? 'text-[#EA4335]' : 'opacity-70'}
                    />
                    {item.label}
                  </>
                )}
              </NavLink>
              );
            })}
            <div className="pt-2 border-t border-slate-200 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2 text-rose-600 bg-rose-50 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <Logout size={16} />
                Sign Out
              </button>
            </div>
          </nav>
        )}

        <main className="flex-grow overflow-y-auto p-4 md:p-8 bg-[#FAFAFA]">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
