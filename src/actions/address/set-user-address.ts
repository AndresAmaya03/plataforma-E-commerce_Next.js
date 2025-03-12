'use server'

import { Address } from "@/interfaces"
import prisma from "@/lib/prisma"

export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const newAddress = await createOrReaplaceAddress(address, userId)

        return{
            ok: true,
            address: newAddress
        }
    } catch (error) {
        return {
            ok: false,
            message: 'could not save address'
        }
    }
}

const createOrReaplaceAddress = async (address: Address, userId: string) => {
    try {
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })

        const country = await prisma.country.findUnique({
            where: {
                id: address.country
            }
        })

        const addressToSave = {
            userId: userId,
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            zipCode: address.zipCode,
            countryId: country!.id,
            phone: address.phone,
            city: address.city
        }

        if (!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })
            return newAddress
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {userId},
            data: addressToSave
        })

        return updatedAddress
    } catch (error) {
        console.log(error)
        throw new Error('could not save address')
    }
}