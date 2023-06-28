import React from 'react';

const SearchTrigger = ({ onClick }) => {
  return (

      <img src="svg/search.svg" alt="Search" className="object-contain cursor-pointer search-trigger" onClick={onClick}/>
    
  );
};

export default SearchTrigger;