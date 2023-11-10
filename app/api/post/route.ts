import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/lib/prismadb'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export  async function GET(
    req: NextRequest,
    res: NextApiResponse
){
        try {
            
             let posts;
             const  userId  = req.nextUrl.searchParams.get("userId") as string
    
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

            if(!posts){ 
                return null
            }
            return res.status(200).json(posts)

        } catch (error) {
            console.log(error)
            return new NextResponse("Invalid request")
        } 
}

export async function POST(
    req: Request,
    res: NextApiResponse
){
    try {
            
            const body  = await req.json();
            const { 
                fileUrl,
                caption
            } = body

            const currentUser = await getCurrentUser();

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
        

    } catch (error) {
        console.log(error)
        return new NextResponse("Invalid request")
    }
}