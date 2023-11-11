import prisma from '@/app/lib/prismadb'
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    req: NextRequest
){
   try {
        const userId  = req.nextUrl.searchParams.get('userId');

        if(!userId || typeof userId !== 'string'){
            throw new Error("Invalid user");
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        const followers = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        });

        return NextResponse.json({...existingUser, followers })
   } catch (error) {
     return Response.error()
   }
}