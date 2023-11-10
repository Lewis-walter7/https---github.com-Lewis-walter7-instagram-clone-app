import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';

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
    req: Request
){
    try {
        const body = await req.json();
        const { fileUrl, caption } = body;

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return Response.error();
        }

        const post = await prisma.post.create({
            data: {
                fileUrls: {
                    set: [fileUrl]
                },
                caption,
                userId: currentUser.id
            }
        });

        return Response.json(post);

    } catch (error) {
        console.log(error);
        return Response.error();
    }
}
