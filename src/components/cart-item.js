export default function CartItem(props) {
  
  return (
    <tr>
      <td>{props.name}</td>
      <td><i className="cart-item" onClick={() => props.denyQuantityCart(props.id)}>-</i></td>
      <td>{props.quantity}</td>
      <td><i className="cart-item" onClick={() => props.addQuantityCart(props.id)}>+</i></td>
      <td>{props.price}</td>
      <td>{props.price * props.quantity}</td>
      <td><i className="material-icons cart-item" onClick={() => props.removeFromCart(props.id)}>close</i></td>
    </tr>
  );
}