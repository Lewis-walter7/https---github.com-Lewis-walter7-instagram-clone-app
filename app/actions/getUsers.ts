import prisma from '@/app/lib/prismadb'
import { NextResponse } from 'next/server'

export default async function getUsers() {
   try {
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        })

        return NextResponse.json(users)
   } catch (error) {
        return null
   }
}