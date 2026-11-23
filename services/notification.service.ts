import { auth } from "@/auth"
import { db } from "@/lib/db"
import { Notification } from "@/lib/generated/prisma/client"
import { revalidatePath } from "next/cache"
import { cacheLife, cacheTag } from "next/cache"

export const getAllNotifications=async () => {
    'use cache'
    cacheTag("notifications")
    cacheLife("hours")
    const messages=await db.notification.findMany()
    return messages
}
export const getUserNotificaions=async()=>{
    const session=await auth()
    const userId=Number(session?.user?.id)
    const notifications=await db.notification.findMany({where:{userId}})
    return notifications
}
export const createNotification=async(data:Notification)=>{
    const notification=await db.notification.create({data})
    revalidatePath('/admin/notificatios')
    return notification
} 

export const deleteNotification=async(id:number)=>{
    const notification=await db.notification.delete({where:{id}})
    revalidatePath('/admin/notificatios')
    return notification
} 

export const updateNotification=async(id:number,data:Notification)=>{
    const notification=await db.notification.update({where:{id},data})
    revalidatePath('/admin/notificatios')
    return notification
} 
export const sendNotification=async({message="",title,type}:Partial<Notification>)=>{
    const session=await auth()
    const userId=Number(session?.user?.id)
    await db.notification.create({
        data:{
            userId,
            message,
            title,
            type
        }
    })
}