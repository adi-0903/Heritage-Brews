import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gifts from './pages/Gifts';
import Sommelier from './pages/Sommelier';
import ChaiMasala from './pages/ChaiMasala';
import Estates from './pages/Estates';
import Stories from './pages/Stories';
import Rewards from './pages/Rewards';
import Checkout from './pages/Checkout';
import Premium from './pages/Premium';
import Reservation from './pages/Reservation';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';

import Profile from './pages/Profile';
import Invoice from './pages/Invoice';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#0a0806] flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user || !user.is_staff) return <Navigate to="/login" replace />;
  return children;
};

const UserPortalRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  
  // If an admin tries to access a public route, send them to the sanctuary.
  if (user?.is_staff && !location.pathname.startsWith('/admin')) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Removed ArchivistSanctuary import

function AppContent() {
  const location = useLocation();
  const minimalRoutes = ['/admin'];
  const isMinimal = minimalRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      <ScrollToTop />
      {!isMinimal && <Navbar />}
      {!isMinimal && <CartDrawer />}
      <main>
        <Routes>
          <Route path="/" element={<UserPortalRoute><Home /></UserPortalRoute>} />
          <Route path="/menu" element={<UserPortalRoute><Menu /></UserPortalRoute>} />
          <Route path="/gifts" element={<UserPortalRoute><Gifts /></UserPortalRoute>} />
          <Route path="/sommelier" element={<UserPortalRoute><Sommelier /></UserPortalRoute>} />
          <Route path="/chai-masala" element={<UserPortalRoute><ChaiMasala /></UserPortalRoute>} />
          <Route path="/estates" element={<UserPortalRoute><Estates /></UserPortalRoute>} />
          <Route path="/stories" element={<UserPortalRoute><Stories /></UserPortalRoute>} />
          <Route path="/rewards" element={<UserPortalRoute><Rewards /></UserPortalRoute>} />
          <Route path="/profile" element={<UserPortalRoute><Profile /></UserPortalRoute>} />
          <Route path="/invoice/:orderId" element={<UserPortalRoute><Invoice /></UserPortalRoute>} />
          <Route path="/checkout" element={<UserPortalRoute><Checkout /></UserPortalRoute>} />
          <Route path="/premium" element={<UserPortalRoute><Premium /></UserPortalRoute>} />
          <Route path="/reservation" element={<UserPortalRoute><Reservation /></UserPortalRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        </Routes>
      </main>
      {!isMinimal && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
      <Analytics />
    </AuthProvider>
  );
}

export default App;
