'use server'
import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";


export const deleteUserAddress = async (userId: string) => {
    try {
        const deletedAddress = await prisma.userAddress.delete({
            where: { userId }
        })
        return {
            ok: true
        }
    } catch (error) {
        console.error(error)
        return {
            ok: false,
            message: 'could not delete address'
        }
    }
}