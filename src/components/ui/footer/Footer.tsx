import { titleFont } from '@/config/font'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div className='flex w-full justify-center text-xs mb-10'>
            <Link
            href={'/'}
            >
                <span className={`${titleFont.className} antialiased font-bold`}>Platform | Shop</span>
                <span>© { new Date().getFullYear() }</span>
            </Link>
            <Link
            href={'/'}
            className='mx-3'
            >
                Privacy & Legal
            </Link>
            <Link
            href={'/'}
            className='mx-3'
            >
                Locations
            </Link>
        </div>
    )
}
