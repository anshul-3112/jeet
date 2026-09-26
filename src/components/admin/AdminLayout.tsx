import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Files, CreditCard, LogOut, Shield, Clock, ExternalLink } from 'lucide-react';
import { adminLogout, getAdminDocuments } from '../../api/admin';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const [expiringCount, setExpiringCount] = useState(0);

  useEffect(() => {
    const fetchExpiring = () => {
      getAdminDocuments()
        .then((res) => {
          setExpiringCount(res.expiringCount || 0);
        })
        .catch(() => {});
    };

    fetchExpiring();
    const interval = setInterval(fetchExpiring, 60000); // refresh count every minute
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } finally {
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800 p-4 justify-between flex-shrink-0">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center space-x-3 px-3 py-4 border-b border-slate-800/80 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wide text-white leading-tight">Jeet Seva Kendra</h1>
              <p className="text-[11px] text-brand-400 font-medium tracking-wider uppercase">Admin Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <NavLink
              to="/admin/documents"
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Files className="w-4 h-4" />
                <span>Documents</span>
              </div>
              {expiringCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 animate-pulse">
                  {expiringCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/admin/payments"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`
              }
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments</span>
            </NavLink>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-4 h-4" />
                <span>Public Site</span>
              </div>
            </a>
          </nav>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top Header */}
        <header className="h-16 bg-slate-950/70 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <span className="md:hidden font-bold text-sm text-white">Jeet Kendra Admin</span>
            {expiringCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-full text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{expiringCount} {expiringCount === 1 ? 'doc' : 'docs'} expiring in &lt;1 hr!</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Shop Active (24/7)</span>
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden p-2 text-slate-400 hover:text-red-400"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950 border-t border-slate-800 flex items-center justify-around px-2 z-40">
        <NavLink
          to="/admin/documents"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium ${
              isActive ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <Files className="w-5 h-5 mb-0.5" />
          <span>Documents</span>
        </NavLink>

        <NavLink
          to="/admin/payments"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium ${
              isActive ? 'text-brand-400' : 'text-slate-400 hover:text-slate-200'
            }`
          }
        >
          <CreditCard className="w-5 h-5 mb-0.5" />
          <span>Payments</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium text-slate-400 hover:text-red-400"
        >
          <LogOut className="w-5 h-5 mb-0.5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};
