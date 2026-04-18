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

import Profile from './pages/Profile';
import Invoice from './pages/Invoice';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

import ArchivistSanctuary from './pages/ArchivistSanctuary';

function AppContent() {
  const location = useLocation();
  const hideFooterFolders = ['/sanctuary'];
  const showFooter = !hideFooterFolders.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sanctuary" element={<ArchivistSanctuary />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/sommelier" element={<Sommelier />} />
          <Route path="/chai-masala" element={<ChaiMasala />} />
          <Route path="/estates" element={<Estates />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/invoice/:orderId" element={<Invoice />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
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
