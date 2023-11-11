import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/app/lib/prismadb'
import { NextResponse } from "next/server";
export async function GET(
    req: NextApiRequest,
    res: NextApiResponse
){
   try {
        const { userId } = req.query;

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
     return res.status(500).end()
   }
}