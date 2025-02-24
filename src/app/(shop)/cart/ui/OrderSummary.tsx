'use client'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import React, { useEffect, useState } from 'react'

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false)
    const { getSummaryInformation } = useCartStore()
    const { itemsInCart, subTotal, tax, total } = getSummaryInformation()

    useEffect(() => {
        setLoaded(true)
    },[])

    if (!loaded) return <p>Loading...</p>


    return (
        <div className="grid grid-cols-2">
            <span>Total quantity</span>
            <span className="text-right">{itemsInCart == 1 ? '1 article' : 
            `${itemsInCart} articles`}</span>

            <span>Shipping</span>
            <span className="text-right">Free</span>

            <span>Sales Tax</span>
            {/*TODO: hoverable icon that shows how sales tax are calculated */}
            <span className="text-right">{currencyFormat(tax)}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subTotal)}</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="text-right mt-5 text-2xl">{currencyFormat(total)}</span>
        </div>
    )
}

