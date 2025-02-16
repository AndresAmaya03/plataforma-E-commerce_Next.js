'use server'
import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender
}

export const getPaginationProductWithImages = async ({
    page = 1,
    take = 12,
    gender,
}: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1
    if (page < 1) page = 1

    try {
        //Obtain all the products
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender: gender
            }
        })

        //obtain all the pages
        const totalPagesCount = await prisma.product.count({
            where: {
                gender: gender
            }
        })
        const totalPages = Math.ceil(totalPagesCount / take)

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }
    } catch (error) {
        throw new Error('Products could not be loaded')
    }
}