import React from 'react';
import './search.css';

function Search({ searchKeyword, setSearchKeyword, setPage, setEnterPressed }) {
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setEnterPressed(true);
    }
    setPage(1);
  };

  return (
    <div className='search_bar'>
      <input
        type="'text"
        value={searchKeyword}
        onChange={(e) => {
          setSearchKeyword(e.target.value);
          setEnterPressed(false);
        }}
        onKeyDown={handleEnterPress}
        placeholder='search by name eamil or role'
      />
    </div>
  );
}

export default Search;
