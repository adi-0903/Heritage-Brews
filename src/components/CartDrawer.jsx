import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsOpen(false)} />
      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <h3 className="cart-drawer__title">
            <span>🧺</span> Your Tokri
          </h3>
          <span className="cart-drawer__count">{totalItems} items</span>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <span className="cart-drawer__empty-icon">🍂</span>
            <p>Your basket is empty</p>
            <p className="cart-drawer__empty-sub">Add some chai to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <span className="cart-item__emoji">{item.emoji || '🍵'}</span>
                    <div>
                      <p className="cart-item__name">{item.name}</p>
                      <p className="cart-item__price">₹{item.price}</p>
                    </div>
                  </div>
                  <div className="cart-item__controls">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeItem(item.id)}>🗑</button>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total">
                <span>Total</span>
                <span className="cart-drawer__total-price">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <p className="cart-drawer__delivery-note">🌿 Free delivery on orders above ₹499</p>
              <Link to="/checkout" className="btn btn-primary btn-lg cart-drawer__checkout" onClick={() => setIsOpen(false)}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
