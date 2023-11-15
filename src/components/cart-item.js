export default function CartItem(props) {
  
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.quantity}</td>
      <td>{props.price}</td>
      <td>{props.price * props.quantity}</td>
      <td><i className="material-icons cart-item-delete" onClick={() => props.removeFromCart(props.id)}>close</i></td>
    </tr>
  );
}