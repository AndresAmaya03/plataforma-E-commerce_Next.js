import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware"


interface State {
    productsInCart: CartProduct[]

    getTotalItems: () => number
    getSummaryInformation: () => {
        subTotal: number
        tax: number
        total: number
        itemsInCart: number
    }
    addProductToCart: (product: CartProduct) => void
    updateProductQuantity: (product: CartProduct, quantity: number) => void
    removeProduct: (product: CartProduct) => void
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            productsInCart: [],

            //Methods
            getTotalItems: () => {
                const { productsInCart } = get()
                return productsInCart.reduce((total, item) => total + item.quantity, 0)
            },

            getSummaryInformation: () => {
                const {productsInCart} = get()

                const subTotal = productsInCart.reduce((subTotal, product) => (product.quantity*product.price)+subTotal,
                0)

                const tax = subTotal*0.15
                const total = subTotal+tax
                const itemsInCart = productsInCart.reduce((total, item) => total + item.quantity, 0)

                return {
                    subTotal, tax, total, itemsInCart
                }
            },

            addProductToCart: (product: CartProduct) => {
                const { productsInCart } = get()

                //check if the product exists in the cart with the selected size
                const existingProduct = productsInCart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                )

                if (!existingProduct) {
                    set({ productsInCart: [...productsInCart, product] })
                    return
                }

                //Need to increment the quantity if the product already exists by size
                const updatedCartProducts = productsInCart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }

                    return item
                })

                set({ productsInCart: updatedCartProducts })

            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { productsInCart } = get()

                const updatedCartProducts = productsInCart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }

                    }
                    return item
                })

                set({ productsInCart: updatedCartProducts })
            },
            removeProduct: (product: CartProduct) => {
                const { productsInCart } = get()

                const updatedCartProducts = productsInCart.filter(
                    (item)=> item.id !== product.id || item.size !== product.size
                )
                set({ productsInCart: updatedCartProducts })
            },
        }),
        {
            name: 'shopping-cart',
        }
    )
)