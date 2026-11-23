import { db } from "@/lib/db"
import { Blog } from "@/lib/generated/prisma/client"
import { revalidatePath } from "next/cache"
// import { cacheLife, cacheTag } from "next/cache"

export const getAllBlogs=async () => {
    // 'use cache'
    // cacheTag("blogs")
    // cacheLife("hours")
    const blogs=await db.blog.findMany()
    return blogs
}
export const getPublishedBlogs=async()=>{
    const blogs=await db.blog.findMany({where:{isPublished:true},include:{user:{select:{username:true}}}})
    return blogs
}
export const createBlog=async(data:Blog)=>{
    const blog=await db.blog.create({data})
    revalidatePath('/admin/blogs')
    return blog
} 
export const deleteBlog=async(id:number)=>{
    const blog=await db.blog.delete({where:{id}})
    revalidatePath('/admin/blogs')
    return blog
} 

export const updateBlog=async(id:number,data:Blog)=>{
    const blog=await db.blog.update({where:{id},data})
    revalidatePath('/admin/blogs')
    return blog
} 