'use client'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { ProductsInCart } from './ProductsInCart'
import { placeOrder } from '@/actions'
import { useRouter } from 'next/navigation'

export const PlaceOrder = () => {

    const router = useRouter()
    const [loaded, setLoaded] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isPlacingOrder, setIsPlacingOrder] = useState(false)

    const address = useAddressStore(state => state.address)
    const { getSummaryInformation } = useCartStore()
    const { itemsInCart, subTotal, tax, total } = getSummaryInformation()

    const cart = useCartStore(state => state.productsInCart)
    const clearCart = useCartStore(state => state.clearCart)

    useEffect(() => {
        setLoaded(true)
    }, [])


    const onPlaceOrder = async () => {
        setIsPlacingOrder(true)
        // await sleep(2)

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))

        const resp = await placeOrder(productsToOrder, address)
        if (!resp.ok) {
            setIsPlacingOrder(false)
            setErrorMessage(resp.message)
            return
        }

        clearCart()

        router.replace('/orders/' + resp.order?.id)
    }

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Shipping Address</h2>
            <div className="mb-10">
                <p className='text-xl'>{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.zipCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>{address.phone}</p>
            </div>


            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>


            <h2 className="text-2xl mb-2">Order Summary</h2>
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

            <div className="mt-5 mb-2 w-full">
                {/* Disclaimer */}
                <p className="mb-5">
                    <span className="text-xs">
                        By clicking on "Place Order", you agree to our <a href="#" className="underline">terms and conditions</a> and <a href="#" className="underline">privacy policies</a>
                    </span>
                </p>


                <p className='text-red-500'>{errorMessage}</p>

                <button
                    onClick={onPlaceOrder}
                    className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled': isPlacingOrder
                        })
                    }
                // href="/orders/123"
                >
                    Place Order
                </button>
            </div>


        </div>
    )
}
