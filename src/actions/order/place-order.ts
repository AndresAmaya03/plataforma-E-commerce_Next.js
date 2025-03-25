'use server'
import { auth } from "@/auth.config"
import { Address, Size } from "@/interfaces"
import prisma from "@/lib/prisma"
import { OrderSummary } from '../../app/(shop)/cart/ui/OrderSummary';

interface ProductToOrder {
    productId: string
    quantity: number
    size: Size
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
    const session = await auth()
    const userId = session?.user.id

    //verify user session
    if (!userId) {
        return {
            ok: false,
            message: 'there is no user session'
        }
    }

    //obtain product info
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(product => product.productId)
            }
        }
    })

    //amount of items
    const itemsInOrder = productIds.reduce((count, product) => count + product.quantity, 0)

    //subtotal, tax and total
    const { subtotal, tax, total } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity
        const product = products.find(product => product.id === item.productId)

        if (!product) throw new Error(`${item.productId} doesn't exist - 500`)

        const subTotal = product.price * productQuantity

        totals.subtotal += subTotal
        totals.tax += subTotal * 0.15
        totals.total += subTotal * 1.15

        return totals
    }, { subtotal: 0, tax: 0, total: 0 })

    //transaction

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            //update stock
            const udpatedProductsPromises = products.map(async (product) => {
                //accumualte values of all items with same id
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0)

                if (productQuantity === 0) {
                    throw new Error(`${product.id} doesn't have a defined quantity`)
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        // inStock: product.inStock - productQuantity
                        inStock: {
                            decrement: productQuantity

                        }
                    }
                })
            })

            const updatedProducts = await Promise.all(udpatedProductsPromises)
            //verify negative values on existences
            updatedProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} doesn't have enough stock`)
                }
            })

            //create header
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subtotal: subtotal,
                    tax: tax,
                    total: total,
                    OrderItem: {
                        createMany: {
                            data: productIds.map(product => ({
                                quantity: product.quantity,
                                size: product.size,
                                productId: product.productId,
                                price: products.find(p => p.id === product.productId)?.price ?? 0

                            }))
                        }
                    }
                }
            })

            //validate if price === 0, throw an error


            //create the order direction
            const { country, ...restAddress } = address
            const orderAddress = await tx.orderAddress.create({
                data: {
                    // ...restAddress,
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    zipCode: address.zipCode,
                    city: address.city,
                    phone: address.phone,
                    countryId: country,
                    orderId: order.id
                }
            })

            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress
            }
        })

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx
        }
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        }
    }


}

