import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import FaceBookProvder from 'next-auth/providers/facebook'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/app/lib/prismadb'


export const handler: AuthOptions = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        FaceBookProvder({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: 'text',
                    type: "text",
                },
                password: {
                    label: 'password',
                    type: 'password'
                }
            },
            async authorize(credentials){
                if(!credentials?.password || !credentials?.email){
                    throw new Error("Invalid Credentials");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user.hashedPassword){
                    throw new Error("Invalid Credentails");       
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password, user?.hashedPassword
                )
                
                if(!isCorrectPassword){
                    throw new Error("Invalid Credentials");                
                }

                return user;

            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST}