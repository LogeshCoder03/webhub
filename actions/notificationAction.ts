"use server"
import { Notification } from "@/lib/generated/prisma/client"
import { createNotification, deleteNotification, updateNotification } from "@/services/notification.service"

export const createNotificationAction=async(data:Notification)=>{
    try{
        await createNotification(data)
        return {
            isSuccess:true,
            message:"Notification create successfully."
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}
export const deleteNotificationAction=async(id:number)=>{
    try{
        await deleteNotification(id)
        return {
            isSuccess:true,
            message:"Notification deleted successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}
export const updateNotificationAction=async(id:number,data:Notification)=>{
    try{
        await updateNotification(id,data)
        return {
            isSuccess:true,
            message:"Notification updated successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}