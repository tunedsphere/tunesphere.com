"use client";
import React from 'react';
import { Button } from '@ui/button';
import '@styles/globals.css';

const Uipage = () => {
    const [date, setDate] = React.useState(new Date());    

  return (
    <main>
    <div className='relative'>

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

    

        {/* <div id="SignInOverlay" className="signinoverlay">
        <div className='flex justify-center mt-24'>
        <div className="flex flex-col px-4 py-8 rounded-lg shadow bg-accent1 sm:px-6 md:px-8 lg:px-10">
    <div className="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
        Create a new account
    </div>

    <span className="justify-center text-sm text-center text-texthigh flex-items-center dark:text-textlow">
        Already have an account ? 

    </span>
    <span className="justify-center text-sm text-center text-texthigh flex-items-center dark:text-gray-400">

        <a href="#" target="_blank" className="text-sm text-blue-500 underline hover:text-blue-700">
             Sign in
        </a>
    </span>
    <div className="p-4 mt-12 gap-4">
        <form action="#">
            <div className="flex flex-col mb-6">
            <div className="relative">
            <span className="justify-center text-texthigh flex-items-center mb-4">
             Email address

    </span>
                                <input type="text" id="create-account-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-textlow placeholder-textlow shadow-sm focus:outline-none focus:ring-2 focus:ring-colortheme focus:border-transparent" placeholder="Email"/>
                                </div>
              
                </div>
                <div className="flex gap-4 mb-6">
                    <div className=" relative ">
                    <span className="justify-center text-texthigh flex-items-center ">
                    Fisrt Name

    </span>
                        <input type="text" id="create-account-first-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-textlow placeholder-textlow text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-colortheme focus:border-transparent" name="First name" placeholder="First name"/>
                        </div>
                        <div className=" relative ">
                        <span className="justify-center text-texthigh flex-items-center ">
                        Last Name

    </span>
                            <input type="text" id="create-account-last-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-textlow placeholder-textlow text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-colortheme focus:border-transparent" name="Last name" placeholder="Last name"/>
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                        <div className=" relative ">
                        <span className="justify-center text-texthigh flex-items-center ">
                        Username

    </span>
                        <input type="text" id="create-account-username" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-textlow text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-colortheme focus:border-transparent" name="username" placeholder="Username"/>
                        </div>
                           
                            </div>
                            <div className="flex justify-center mt-24">
                                <button type="submit" className=" w-1/3 py-2 px-4 bg-colortheme hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">
                                    Login
                                </button>
                            </div>
                        </form>
                        
                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div> */}
                                      
   


</main>

  )
}

export default Uipage;  