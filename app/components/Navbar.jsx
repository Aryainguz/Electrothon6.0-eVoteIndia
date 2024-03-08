'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const pathname = usePathname()
    if (pathname === '/register' || pathname === '/login') {
        return null;
    }

    return (
        <nav className="flex-wrap lg:flex bg-white shadow-2xl fixed w-full z-[99999] justify-between items-center w-[100%] m-auto py-4 px-10 rounded-b-[2rem]">
            <div className="flex items-center mb-10 lg:mb-0 w-1/4" >
                <div className="text-3xl sm:text-3xl flex  font-bold text-gradient bg-gradient-to-r from-orange-500 to-green-300 bg-clip-text text-transparent">
                    CryptoVote
                </div>
                <button
                    className="md:hidden w-10 h-10 ml-auto flex items-center justify-center border-blue-500 text-blue-500 rounded-md"
                    onClick={() => setNavbarOpen(!navbarOpen)}
                >
                    <h1 className='text-white bg-purple-500 w-16 font-bold text-3xl flex justify-center items-center absolute right-2 border-2 hover:bg-purple-500 hover:text-white border-purple-500 rounded-sm'>&#8801;</h1>
                </button>
            </div>

            <div className={`lg:flex flex-col md:flex-row md:items-center text-center gap-8 md:space-x-6 ${!navbarOpen ? 'hidden' : 'flex'}`}>
                <button id="sign-in-button" className="w-15" prefetch="true">
                    <Link className='text-black font-medium' href="/login">Sign In</Link>
                </button>
                <button className="text-[#4461F2] relative py-2 px-6 font-semibold rounded-[50px] overflow-hidden bg-white transition-all duration-400 ease-in-out shadow-lg hover:scale-105 hover:text-white hover:shadow-xl active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-[50px] hover:before:left-0" prefetch="true">
                    <Link href="/register">Register</Link>
                </button>
            </div>
        </nav>
    );
};

export default Header;