'use server'
import prisma from "@/lib/prisma"
// import { sleep } from "@/utils"


export const getStockBySlug = async(slug: string): Promise<number> => {
    try {

        // await sleep(2.5)

        const stock = await prisma.product.findFirst({
            where: {slug},
            select: {inStock: true}
        })

        return stock?.inStock ?? 0
        
    } catch (error) {
        console.log(error)
        throw new Error('Error trying to find stock by slug')
    }
}