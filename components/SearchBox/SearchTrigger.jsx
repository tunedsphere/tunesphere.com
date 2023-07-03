import React from 'react';
import { Icons } from '@components/icons';
import { Button } from '@components/ui/button';
const SearchTrigger = ({ onClick }) => {
  return (
      <Button 
      variant='nav'>
      <Icons.search alt="Search" className="object-contain cursor-pointer search-trigger" onClick={onClick}/>
      </Button>
  );
};

export default SearchTrigger;