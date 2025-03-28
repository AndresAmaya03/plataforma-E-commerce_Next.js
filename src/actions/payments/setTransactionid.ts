'use server'
import prisma from "@/lib/prisma"


export const setTransactionId = async (orderId: string, transactionId: string) => {
    try {
        const order = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                transactionId: transactionId
            }
        })

        if (!order) {
            return {
                ok: false,
                message: `could not find id ${orderId}`
            }
        }

        return {
            ok: true
        }

    } catch (error) {
        console.error(error)

        return {
            ok: false,
            message: 'could not set transaction id'
        }
    }
}