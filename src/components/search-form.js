import { useRef, useState } from 'react';

const SearchFrom = (props) => {
  const inputRef = useRef();
  const [query, setQuery] = useState('');

  const handleQueryChange = () => {
    const inputValue = inputRef.current.value;
    setQuery(inputValue);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchCard(query);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="material-icons">search</div>
      <input
        ref={inputRef}
        onChange={handleQueryChange}
        className="search-form__input"
        type="text"
        placeholder="Поиск..."
        minLength="2"
        maxLength="200"
        autoComplete="off"
        required
      />
      <button className="btn-small" type="submit" >Найти</button>
    </form>
  );
}

export default SearchFrom;