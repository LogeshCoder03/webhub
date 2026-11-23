'use server'

import {db} from "@/lib/db"
import { User } from "@/lib/generated/prisma/client"
import { hashPassword } from "@/lib/passkey"
import { cacheLife, cacheTag, revalidatePath, revalidateTag } from "next/cache"
import crypto from 'crypto'
import { SignUpType } from "@/validations/auth"

export const getAllUsers=async ()=>{
    'use cache'
    cacheTag("users")
    cacheLife("hours")
    const users=await db.user.findMany()
    return users
}

export const userRegister=async(userData:SignUpType)=>{
    const {username,email,password}=userData
    const isAlreadyUserExists=await db.user.findUnique({where:{email:email}})
    const isAlreadyUserNameExists=await db.user.findFirst({where:{username:username}})
    if (isAlreadyUserExists){
        throw new Error("An account with this email already exists")
    }
    if (isAlreadyUserNameExists){
        throw new Error("Username is already taken.Please choose a different username")
    }
    const hashedPassword=await hashPassword(password)
    const user=await db.user.create({data:{
        username:username,
        email:email,
        password:hashedPassword
    }})
    return {
        id:user.id,
        username:user.username,
        email:user.email,
        isSuperUser:user.isSuperUser,
        isAdmin:user.isAdmin,
    }
}

export const deleteUser=async (id:number) => {
    const user=await db.user.findUnique({where:{id}})
    if (!user) {
        throw new Error("User doesn't exist")
    }
    await db.user.delete({where:{id}})
    revalidateTag('users',"max")
    revalidatePath('/admin/users')
}

export const updateUser=async (id:number,data:User) => {    
    const user=await db.user.findUnique({where:{id}})
    if (!user) {
        throw new Error("user not found")
    }
    data.password=await hashPassword(data.password)
    await db.user.update({
        where:{id},
        data
    })
    revalidateTag('users',"max")
    revalidatePath('/admin/users')
}

export const resetPassword=async(token:string,password:string)=>{
    if (!password) {
        throw new Error("Password is required")
    }
    const user=await db.user.findFirst({
        where:{
            resetToken:token
        }
    })
    if (!user) {
        throw new Error("User doesn't exist")
    }
    if (user.resetTokenExpires! < new Date()) {
        throw new Error("Token Expired")
    }
    const hashedPassword=await hashPassword(password)
    await db.user.update({
        where:{id:user.id},
        data:{
            password:hashedPassword
        }
    })
}

export async function createVerificationToken(userId:number,email:string) {
    const token=crypto.randomBytes(32).toString("hex")
    await db.verificationToken.create({
        data:{
            token:token,
            userId:userId,
            expiresAt:new Date(Date.now()+1000*60*60)
        },
        include:{
            user:{
                select:{username:true}
            }
        }
    })
    return token
}
export async function verifyToken(token:string) {
    const record=await db.verificationToken.findUnique({
        where:{token}
    })

    if (!record||record.expiresAt<new Date()) {
        throw new Error("Token is expired.")
    }
    await db.user.update({
        where:{id:record.userId},
        data:{isActive:true}
    })
}

export const setResetToken=async(email:string)=>{
    if (!email) {
        throw new Error("Provide a valid email address")
    }
    const token=crypto.randomBytes(32).toString("hex")
    const isUser=await db.user.findFirst({
        where:{
            email:email
        }
    })
    if (!isUser) {
        throw new Error("If an acount exists with this email ,you will receive a password reset link shortly")
    }
    const user=await db.user.update({
        where:{email:email},
        data:{
            resetToken:token,
            resetTokenExpires:new Date(Date.now()+15*60*1000)
        }
    })
    return {
        token:user.resetToken,
        email:user.email
    }
}
export const checkIsUser=async (userEmail:string) => {
    const user=await db.user.findUnique({where:{email:userEmail}})
    return user
}

export const createUser=async (userData:User) => {
    const isAlreadyUserExists=await db.user.findUnique({where:{email:userData.email}})
    const isAlreadyUserNameExists=await db.user.findFirst({where:{username:userData.username}})
    if (isAlreadyUserExists){
        throw new Error("An account with this email already exists")
    }
    if (isAlreadyUserNameExists){
        throw new Error("Username is already taken.Please choose a different username")
    }
    const hashedPassword=await hashPassword(userData.password)
    await db.user.create({data:{
        username:userData.username,
        email:userData.email,
        password:hashedPassword,
        isSuperUser:userData.isSuperUser,
        isAdmin:userData.isAdmin,
        isActive:userData.isSuperUser,
    }})
}