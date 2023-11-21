import { useState, useEffect } from "react";
import { API_KEY, API_URL_LIST } from "../config";
import Preloader from './preloader';
import ShopCard from './shop-card';
import SearchFrom from './search-form';

export default function ShopList({ appendToCart, cartItems }) {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [check, setCheck] = useState(0);
  
  const [step, setStep] = useState(24);
  const [button, setButton] = useState(false);

  const [resaltSearch, setResaltSearch] = useState([]);
  const [searchs, setSearchs] = useState(true);
    
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
    if (resaltSearch.length || !searchs) {
      setCheck(resaltSearch.length);
      setItems(resaltSearch.slice(0, step));
      if (step > resaltSearch.length) {
        setButton(true);
      }
    } else {
      setCheck(list.length);
      setItems(list.slice(0, step));
    }
  }, [resaltSearch, searchs, list, step])
  
  const addItems = () => {
    if (step < check) {
      setStep(step + 24);
    } else {
      setButton(true);
    }
  };

  const searchCard = (query) => {
    let result = list.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
    setResaltSearch(result);
    (result.length === 0) && setSearchs(false);
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
        <p>{searchs ? 'Не удалось загрузить список' : 'По вашему запросу ничего не найдено'}</p>
      )}
    </div>
  );
}