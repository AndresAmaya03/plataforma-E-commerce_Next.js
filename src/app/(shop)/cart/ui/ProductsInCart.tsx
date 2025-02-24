'use client'
import { useCartStore } from '@/store'
import Image from 'next/image'
import { QuantitySelector } from '@/components'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeProduct = useCartStore(state => state.removeProduct)
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
                            <Link 
                            className='hover:underline cursor-pointer'
                            href={`/product/${product.slug}`}>
                                {product.size} - {product.title}
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector
                                quantity={product.quantity}
                                onQuantityChanged={value => updateProductQuantity(product, value)}
                            />
                            <button 
                            onClick={() => removeProduct(product)}
                            className="underline mb-3">Remove</button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

