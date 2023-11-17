import { useState, useEffect } from "react";
import { API_KEY, API_URL_LIST } from "../config";
import Preloader from './preloader';
import ShopCard from './shop-card';
import SearchFrom from './search-form';

export default function ShopList({ appendToCart, cartItems }) {
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(24);
  const [button, setButton] = useState(false);
    
  useEffect(() => {
    fetch(API_URL_LIST, {
      headers: {
        Authorization: API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        data.items && setList(data.items);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setItems(list.slice(0, step));
  }, [list, step])
  
  const addItems = () => {
    if (step <= list.length) {
      setStep(step + 24);
    } else {
      setButton(true);
    }
  };

  const searchCard = (query) => {
    let result = list.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    })
    setItems(result);
  };

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : items.length ? (
        <>
          <SearchFrom searchCard={searchCard} />
          <div className="items">
            {items.map(item => (
              <ShopCard key={item.id} appendToCart={appendToCart} cartItems={cartItems} {...item} />
            ))}
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <button disabled={button} className="btn-small" style={{margin: "10px"}} onClick={addItems}>
              {!button ? 'Ещё' : 'Это все товары :('}
            </button>
          </div>
        </>
      ) : (
        <p>Не удалось загрузить список</p>
      )}
    </div>
  );
}