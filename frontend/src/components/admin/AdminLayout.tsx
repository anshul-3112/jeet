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
    <div className="min-h-screen bg-[#FAF8F5] text-[#152220] flex flex-col md:flex-row font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#EAE4DC] p-5 justify-between flex-shrink-0 shadow-2xs">
        <div>
          {/* Logo / Header */}
          <div className="flex items-center space-x-3 px-2 py-3 border-b border-[#F3EFEA] mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#113D36] flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight text-[#152220] leading-tight font-sans">
                Jeet Seva Kendra
              </h1>
              <p className="text-[10px] text-[#A86938] font-bold tracking-wider uppercase mt-0.5">
                Admin Console
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <NavLink
              to="/admin/documents"
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#E2EFEA] text-[#113D36] font-bold shadow-2xs'
                    : 'text-[#4A5B57] hover:text-[#113D36] hover:bg-[#F3EFEA]'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                <Files className="w-4 h-4" />
                <span>Citizen Documents</span>
              </div>
              {expiringCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F7EFE7] text-[#A86938] rounded-full border border-[#EFDCB9] animate-pulse">
                  {expiringCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/admin/payments"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#E2EFEA] text-[#113D36] font-bold shadow-2xs'
                    : 'text-[#4A5B57] hover:text-[#113D36] hover:bg-[#F3EFEA]'
                }`
              }
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments &amp; Ledger</span>
            </NavLink>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-semibold text-[#798C87] hover:text-[#113D36] hover:bg-[#F3EFEA] transition-colors"
            >
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-4 h-4" />
                <span>Live Public Site</span>
              </div>
            </a>
          </nav>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="pt-4 border-t border-[#F3EFEA]">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-3.5 py-2.5 rounded-full text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#EAE4DC] px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <span className="md:hidden font-bold text-sm text-[#152220]">Jeet Kendra Admin</span>
            {expiringCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F7EFE7] border border-[#EFDCB9] text-[#A86938] rounded-full text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#A86938] animate-pulse" />
                <span>{expiringCount} {expiringCount === 1 ? 'doc' : 'docs'} expiring in &lt;1 hr!</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-xs text-[#4A5B57] bg-[#F2F8F6] px-3 py-1 rounded-full border border-[#C2DDD4]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium text-[#113D36]">Center Active (24/7)</span>
            </div>
            <button
              onClick={handleLogout}
              className="md:hidden p-2 text-[#798C87] hover:text-red-600"
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
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#EAE4DC] flex items-center justify-around px-2 z-40">
        <NavLink
          to="/admin/documents"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium ${
              isActive ? 'text-[#113D36] font-bold' : 'text-[#798C87]'
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
              isActive ? 'text-[#113D36] font-bold' : 'text-[#798C87]'
            }`
          }
        >
          <CreditCard className="w-5 h-5 mb-0.5" />
          <span>Payments</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium text-[#798C87] hover:text-red-600"
        >
          <LogOut className="w-5 h-5 mb-0.5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};
