'use client'
import { useCartStore } from '@/store'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { currencyFormat } from '@/utils'

export const ProductsInCart = () => {

    const [loaded, setLoaded] = useState(false)
    const productsInCart = useCartStore(state => state.productsInCart)

    useEffect(() => {
        setLoaded(true)
    })

    if (!loaded) {
        return <p>loading...</p>
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex items-center mb-5">
                        <Image
                            src={`/products/${product.images}`}
                            width={100}
                            height={100}
                            style={{
                                width: '150px',
                                height: '150px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />
                        <div>
                            <span>
                                {product.size} - {product.title} (Quantity: {product.quantity})
                            </span>
                            <p className='font-bold'>{currencyFormat(product.price * product.quantity)}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

