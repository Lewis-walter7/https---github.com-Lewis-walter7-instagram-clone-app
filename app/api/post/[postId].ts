import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/app/lib/prismadb';

export default async function GET(
    req: NextApiRequest,
    res: NextApiResponse
){
   try {
        const { postId } = req.query;

        if(!postId || typeof postId !== 'string'){
            return res.status(500).end()
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: true
            }
        });

        if(!post) {
            return res.status(400).end()
        }

        return res.status(200).json(post)
   } catch (error) {
        return res.status(400).end()
   }
}