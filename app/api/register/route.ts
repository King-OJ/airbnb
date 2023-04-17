import bcrypt from 'bcryptjs'
import prismadb from '../../../libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {

        const body = await request.json()
        const { name, email, password } = body
        console.log(body);

        //to hash password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prismadb.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        })
    
    return NextResponse.json(user)
    
  }