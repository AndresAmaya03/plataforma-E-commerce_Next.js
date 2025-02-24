'use client'
import { QuantitySelector, SizeSelector } from '@/components'
import type { Product, Size, CartProduct } from '@/interfaces'
import { useCartStore } from '@/store'
import React, { useState } from 'react'

interface Props {
    product: Product
}


export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart)

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [posted, setPosted] = useState(false)

    const addToCart = () => {
        setPosted(true)

        if (!size) return

        const carProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            images: product.images[0]
        }

        addProductToCart(carProduct)
        setPosted(false)
        setQuantity(1)
        setSize(undefined)
    }

    return (
        <>
            {
                posted && !size && (
                    <span className='text-red-500 mt-2'>
                        A size needs to be selected
                    </span>)
            }

            {/* Size selector */}
            < SizeSelector
                onSizeChanged={setSize}
                selectedSize={size}
                availableSizes={product.sizes}
            />

            {/* quantity selector */}
            < QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/* Button */}
            <button
                onClick={addToCart}
                className="btn-primary my-5" >
                Add to cart
            </button ></>
    )
}
