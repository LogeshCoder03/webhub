"use server"

import { Message } from "@/lib/generated/prisma/client"
import { createMessage, deleteMessage, updateMessage } from "@/services/messages.service"

export const createMessageAction=async(data:Message)=>{
    try{
        await createMessage(data)
        return {
            isSuccess:true,
            message:"Message create successfully."
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}

export const deleteMessageAction=async(id:number)=>{
    try{
        await deleteMessage(id)
        return {
            isSuccess:true,
            message:"Message deleted successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}
export const updateMessageAction=async(id:number,data:Message)=>{
    try{
        await updateMessage(id,data)
        return {
            isSuccess:true,
            message:"Message updated successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}