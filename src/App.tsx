import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileContactBar } from './components/layout/MobileContactBar';

// Public Page Imports
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { ThankYouPage } from './pages/ThankYouPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { UploadPage } from './pages/UploadPage';
import { TrackStatusPage } from './pages/TrackStatusPage';

// Admin Imports
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDocumentsPage } from './pages/admin/AdminDocumentsPage';
import { AdminDocumentDetailPage } from './pages/admin/AdminDocumentDetailPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { RequireAdmin } from './components/admin/RequireAdmin';
import { AdminLayout } from './components/admin/AdminLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Layout and Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/track" element={<TrackStatusPage />} />
              <Route path="/track/:trackingId" element={<TrackStatusPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            {/* Admin Login (Public) */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Shell */}
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<Navigate to="/admin/documents" replace />} />
              <Route path="documents" element={<AdminDocumentsPage />} />
              <Route path="documents/:id" element={<AdminDocumentDetailPage />} />
              <Route path="payments" element={<AdminPaymentsPage />} />
            </Route>
          </Routes>
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
