'use client'
import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/font'
import React, { useEffect, useState } from 'react'

interface Props {
    slug: string
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0)
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        getStock()
    }, [])

    const getStock = async () => {
        const inStock = await getStockBySlug(slug)
        setStock(inStock)
        setIsloading(false)
    }


    return (
        <>
            {
                isLoading ? (
                    <h1 className={`${titleFont.className} antialiased font-bold text-xl bg-gray-200 animate-pulse`}>
                        &nbsp;
                    </h1>
                ) : (
                    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                        Stock: {stock}
                    </h1>
                )
            }
        </>
    )
}

