import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export default async function hanler(
    req:NextApiRequest,
    res: NextApiResponse
){
    
    if(req.method !== "POST" && req.method !== 'GET'){
        throw new Error("Invalid request");    
    }

    try {

        if(req.method === 'POST') {
            const { fileUrl, caption } = await req.body;
            const currentUser = await getCurrentUser()
            if(!currentUser){
                return null
            }
            
        
            const post = await prisma.post.create({
                data: {
                    fileUrl,
                    caption,
                    userId: currentUser.id
                }
            });

            return res.status(200).json(post)
        }

        if(req.method === "GET"){
            let posts;
            const { userId } = req.query

            if(userId && typeof userId === 'string'){
                posts = await prisma.post.findMany({
                    where: {
                        userId
                    },
                    include: {
                        user: true,
                        comments: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                })
            } else {
                posts = await prisma.post.findMany({
                    include:{
                        user: true,
                        comments: true
                    }
                })
            }

        }


    } catch (error) {
        return new NextResponse("Invalid request")
    }
   
}