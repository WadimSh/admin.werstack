import { useState } from 'react';
import CartItem from './cart-item';

export default function CartList(props) {
  const cost = props.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
  return (
    <div className="cart-modal">
      <i className="material-icons cart-modal-close" onClick={props.toggleShow}>
        close
      </i>
      <h5 className="red-text text-lighten-1">Ваша корзина</h5>
      {props.items.length ? (
        <table className="striped">
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Сумма</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {props.items.map(item => <CartItem key={item.id} removeFromCart={props.removeFromCart} {...item} />)}
            <tr>
              <th colSpan="3">Итоги</th>
              <th>{cost}</th>
              <th>$</th>
            </tr>
            <tr>
              <th colSpan="4"></th>
              <th>
                <button className="btn-small right" style={{margin: "10px"}} onClick={props.handleOrder}>
                  Оформить заказ
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </div>
  );
}