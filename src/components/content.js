import { useState } from 'react';
import CartIcon from './cart-icon';
import CartList from './cart-list';
import ShopList from './shop-list';
import ShowAlert from './show-alert';

const Content = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAlert, setShowAlert] = useState(null);
  const [textButton, setTextButton] = useState(true);

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
      const newCart = [...cartItems];
      newCart.splice(itemIndex, 1, newItem);
      setCartItems(newCart);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    setCartItems(newCart);
  };

  const updateQuantity = (id, delta) => {
    const itemIndex = cartItems.findIndex(value => value.id === id);

    if (itemIndex >= 0) {
      const newItem = { ...cartItems[itemIndex], quantity: cartItems[itemIndex].quantity + delta };
      if (newItem.quantity <= 0) {
        removeFromCart(id);
      } else {
        const newCart = [...cartItems];
        newCart.splice(itemIndex, 1, newItem);
        setCartItems(newCart);
      }
    }
  };

  const addQuantityCart = (id) => {
    updateQuantity(id, 1);
  };

  const denyQuantityCart = (id) => {
    updateQuantity(id, -1);
  };

  const toggleShow = () => setShowCart(!showCart);

  const handleAlert = () => setShowAlert(null);

  const handleOrder = () => {
    setTextButton(false);
    const timeoutId = setTimeout(() => {
    setShowAlert('Ваш заказ успешно принят в обработку!');
    setTextButton(true);
    setCartItems([]);
    setShowCart(!showCart);  
    }, 2000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <main className="container">
      <CartIcon length={cartItems.length} toggleShow={toggleShow} />
      {showAlert && <ShowAlert text={showAlert} handleAlert={handleAlert} />}
      <ShopList appendToCart={appendToCart} cartItems={cartItems} />
      { showCart && (<CartList 
                      items={cartItems} 
                      textButton={textButton} 
                      toggleShow={toggleShow} 
                      removeFromCart={removeFromCart} 
                      handleOrder={handleOrder} 
                      addQuantityCart={addQuantityCart} 
                      denyQuantityCart={denyQuantityCart}
                    />)
      }
    </main>
  );
}

export default Content;