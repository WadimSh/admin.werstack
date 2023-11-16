import { useState } from "react";

export default function ShopCard(props) {
  const [cost, setCost] = useState(null);
  const { id, name, price, images } = props;
  const item = {id: id, name: name, price: price};
  
  const handleAppend = (val) => {
    props.appendToCart(val);
    const itemIndex = props.cartItems.find(value => value.id === item.id);
    if (itemIndex !== undefined) {
      setCost(itemIndex.quantity + 1);
    } else {
      setCost(1);
    }
  };
    
  return (
    <div id={"product-" + id} className="card">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={images.icon} alt={name} />
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          {name}
        </span>
        <p>Цена: {price} $</p>
      </div>
      <div className="card-action">
        <button className="btn-small right" style={{marginBottom: "10px"}} onClick={() => handleAppend(item)}>
          {cost !== null ? `Вы купили ${cost}` : 'Купить'}
        </button>
      </div>
    </div>
  );
}