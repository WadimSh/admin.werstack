import { useState, useEffect } from "react";
import { API_KEY, API_URL_LIST } from "../config";
import Preloader from './preloader';
import ShopCard from './shop-card';

export default function ShopList({ appendToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL_LIST, {
      headers: {
        Authorization: API_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        data.items && setItems(data.items.slice(0, 24));
        setLoading(false);
      });
  }, []);

  return (
    <div className="items">
      {loading ? (
        <Preloader />
      ) : items.length ? (
        items.map(item => (
          <ShopCard key={item.id} appendToCart={appendToCart} {...item} />
        ))
      ) : (
        <p>Не удалось загрузить список</p>
      )}
    </div>
  );
}