'use client'
import { titleFont } from '@/config/font'
import { useCartStore, useUIStore } from '@/store'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {

    const openMenu = useUIStore(state => state.openSideMenu)
    const getTotalItemsInCart = useCartStore(state => state.getTotalItems())
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    },[])

    return (
        <nav className='flex px-5 justify-between items-center w-full'>
            <Link href={"/"}>
                <span className={`${titleFont.className} antialiased font-bold`}>
                    Platform | shop
                </span>
            </Link>

            <div className='hidden sm:block'>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-200' href={'/gender/men'}>Men</Link>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-200' href={'/gender/women'}>Women</Link>
                <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-200' href={'/gender/kid'}>Kids</Link>

            </div>

            <div className='flex items-center'>
                <Link href={'/search'} className='mx-2'>
                    <IoSearchOutline className='w-5 h-5' />
                </Link>

                <Link href={
                    ((getTotalItemsInCart === 0) && loaded) ? '/empty' : 
                    '/cart'} className='mx-2'>
                    <div className='relative'>
                        {
                            (loaded && getTotalItemsInCart > 0) && (
                                <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white fade-in'>
                                    {getTotalItemsInCart}
                                </span>
                            )
                        }

                        <IoCartOutline className='w-5 h-5' />
                    </div>
                </Link>

                <button
                    onClick={() => openMenu()}
                    className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
                    Menu
                </button>
            </div>
        </nav>
    )
}

