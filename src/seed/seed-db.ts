import { initialData } from "./seed"
import prisma from '../lib/prisma';
import { create } from 'zustand';
import { IMAGES_MANIFEST } from "next/dist/shared/lib/constants";
import Image from 'next/image';
import { A } from "ollama/dist/shared/ollama.6319775f";

interface Abc {

}

async function main() {

    //Delete previous data
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.category.deleteMany()

    const { categories, products } = initialData

    //categories
    const categoriesData = categories.map(category => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    })

    const categoriesDB = await prisma.category.findMany()

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id
        return map
    }, {} as Record<string, string>)


    //products
    products.forEach(async (product) => {
        const { type, images, ...rest } = product
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        //images
        const imageData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }
        ))

        await prisma.productImage.createMany({
            data: imageData
        })
    })



}

(() => {
    if (process.env.NODE_ENV === 'production') return
    main()
})()