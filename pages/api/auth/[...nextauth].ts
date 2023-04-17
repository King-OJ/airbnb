import NextAuth, { AuthOptions } from "next-auth"
// import Providers from "next-auth/providers"

import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"

import prismadb from '../../../libs/prismadb'

export const authOptions: AuthOptions = {

    adapter: PrismaAdapter(prismadb),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text'},
                password: { label: 'password', type: 'password'},
            },

            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials')
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if(!user || !user?.hashedPassword){
                    throw new Error('Invalid credentials')
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword)

                if(!isPasswordCorrect) {
                    throw new Error('Invalid credentials')
                }

                return user;
            },

        })
    ],

    pages: {
        signIn: '/'
    },

    //enable you to see errors while developing
    debug: process.env.NODE_ENV === 'development',

    session: {
        strategy: "jwt"
    },

    secret: process.env.NEXTAUTH_SECRET


}

export default NextAuth(authOptions)