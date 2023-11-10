import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function GET(
    req: NextRequest,
){
    try {
        let posts;
        const userId = req.nextUrl.searchParams.get("userId") as string

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
            return Response.error()
        }
        return Response.json(posts);

    } catch (error) {
        console.log(error);
        return Response.error();
    } 
}

export async function POST(
    req: Request,
    res: NextApiResponse
){
    try {
        const body = await req.json();
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
