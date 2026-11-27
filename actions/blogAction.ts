"use server"

import { Blog } from "@/lib/generated/prisma/client"
import { createBlog, deleteBlog, updateBlog } from "@/services/blog.service"

export const createBlogAction=async(data:Blog)=>{
    try{
        await createBlog(data)
        return {
            isSuccess:true,
            Blog:"Blog create successfully."
        }
    }catch(error){
        return {
            isSuccess:false,
            Blog:error instanceof Error?error.message:"Error occured"
        }
    }
}

export const deleteBlogAction=async(id:number)=>{
    try{
        await deleteBlog(id)
        return {
            isSuccess:true,
            Blog:"Blog deleted successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            Blog:error instanceof Error?error.message:"Error occured"
        }
    }
}
export const updateBlogAction=async(id:number,data:Blog)=>{
    try{
        await updateBlog(id,data)
        return {
            isSuccess:true,
            Blog:"Blog updated successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            Blog:error instanceof Error?error.message:"Error occured"
        }
    }
}