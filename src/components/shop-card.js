export default function ShopCard(props) {
  const { id, name, price, images } = props;
  const item = {id: id, name: name, price: price};
  const hednleClick = () => {
    props.appendToCart(item);
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
        <button className="btn-small" onClick={hednleClick}>Купить</button>
        <button className="btn-small right" onClick={hednleClick}>Больше</button>
      </div>
    </div>
  );
}