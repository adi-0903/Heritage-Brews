import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Get active membership from user profile
  const activeMembership = user?.profile?.active_membership;
  const discountRate = activeMembership?.discount_percentage ? parseFloat(activeMembership.discount_percentage) / 100 : 0;

  const addItem = useCallback((item) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  
  // Calculate raw price
  const rawTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  
  // Apply discount (only if not a membership item itself?)
  // Usually discounts apply to products, not membership fees.
  const discountedTotal = items.reduce((sum, i) => {
    const itemPrice = i.type === 'membership' ? i.price : i.price * (1 - discountRate);
    return sum + itemPrice * i.qty;
  }, 0);

  const totalPrice = discountedTotal;
  const savings = rawTotal - discountedTotal;

  return (
    <CartContext.Provider value={{
      items, isOpen, addItem, removeItem, updateQty,
      clearCart, toggleCart, setIsOpen, totalItems, totalPrice,
      rawTotal, savings, discountRate
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
