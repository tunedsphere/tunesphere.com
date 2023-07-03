import React from 'react';
import { Icons } from '@components/icons';
import { Button } from '@components/ui/button';
const SearchTrigger = ({ onClick }) => {
  return (
    <Button 
    variant='nav'
    size="xs"
    className='text-texthigh hover:text-colortheme'>
      <Icons.search alt="Search" className="object-contain cursor-pointer search-trigger" onClick={onClick}/>
      </Button>
  );
};

export default SearchTrigger;