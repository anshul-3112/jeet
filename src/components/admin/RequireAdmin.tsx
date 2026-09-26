import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAdminMe, type AdminUser } from '../../api/admin';
import { Loader2 } from 'lucide-react';

export const RequireAdmin: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [_user, setUser] = useState<AdminUser | null>(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    getAdminMe()
      .then((res) => {
        if (isMounted) {
          setUser(res.user);
          setAuthenticated(true);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setAuthenticated(false);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-3" />
        <p className="text-sm font-medium text-slate-400">Verifying admin access...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
