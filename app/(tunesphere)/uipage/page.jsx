"use client";

import React from 'react';

import { Button } from '@/ui/button';


const Uipage = () => {
    const [date, setDate] = React.useState(new Date());    

  return (
    <main>
    <div className='relative mt-44'>

                <Button 
                size="xs"
                variant="destructive">Button</Button>
                 <Button 
                 variant="default">Button</Button>
                 <Button 
                 variant="ghost">Button</Button>
                 <Button 
                 variant="outline">Button</Button>
                 <Button 
                 variant="secondary">Button</Button>
                 <Button 
                 variant="link">Button</Button> 
    </div>

</main>

  )
}

export default Uipage;  