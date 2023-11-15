import { useState } from 'react';
import CartIcon from './cart-icon';
import CartList from './cart-list';
import ShopList from './shop-list';

const Content = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const appendToCart = (item, quantity = 1) => {
    const itemIndex = cartItems.findIndex(value => value.id === item.id);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: quantity
      };
      setCartItems([...cartItems, newItem]);
    } else {
      const newItem = {
        ...cartItems[itemIndex],
        quantity: cartItems[itemIndex].quantity + quantity
      };
      const newCart = cartItems.slice();
      newCart.splice(itemIndex, 1, newItem);
      setCartItems(newCart);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
  };

  const toggleShow = () => setShowCart(!showCart);

  return (
    <main className="container">
      <CartIcon length={cartItems.length} toggleShow={toggleShow} />
      <ShopList appendToCart={appendToCart} />
      { showCart ? <CartList items={cartItems} toggleShow={toggleShow} removeFromCart={removeFromCart} /> : null }
    </main>
  );
}

export default Content;