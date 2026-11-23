'use server'
import {db} from "@/lib/db"
import { Message } from "@/lib/generated/prisma/client"
import { revalidatePath } from "next/cache"
import { cacheLife, cacheTag } from "next/cache"


export const getAllMessages=async () => {
    'use cache'
    cacheTag("messages")
    cacheLife("hours")
    const messages=await db.message.findMany()
    return messages
}

export const createMessage=async(data:Message)=>{
    const message=await db.message.create({data})
    revalidatePath('/admin/projects/messages')
    return message
} 

export const deleteMessage=async(id:number)=>{
    const message=await db.message.delete({where:{id}})
    revalidatePath('/admin/projects/messages')
    return message
} 

export const updateMessage=async(id:number,data:Message)=>{
    const message=await db.message.update({where:{id},data})
    revalidatePath('/admin/projects/messages')
    return message
} 