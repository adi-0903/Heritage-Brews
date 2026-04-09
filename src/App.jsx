import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
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
import Reservation from './pages/Reservation';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gifts" element={<Gifts />} />
            <Route path="/sommelier" element={<Sommelier />} />
            <Route path="/chai-masala" element={<ChaiMasala />} />
            <Route path="/estates" element={<Estates />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/reservation" element={<Reservation />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
