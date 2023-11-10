import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        let posts;
        const userId = req.query.userId as string;

        if (userId && typeof userId === 'string') {
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
            });
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true
                }
            });
        }

        if (!posts || posts.length === 0) { 
            return res.status(400).end();
        }
        return res.json(posts);

    } catch (error) {
        console.log(error);
        return res.status(500).end();
    } 
}

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const body = req.body;
        const { fileUrl, caption } = body;

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return res.status(401).end();
        }

        const post = await prisma.post.create({
            data: {
                fileUrl,
                caption,
                userId: currentUser.id
            }
        });

        return res.json(post);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}
