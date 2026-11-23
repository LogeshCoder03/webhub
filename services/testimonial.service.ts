'use server'

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Testimonials } from "@/lib/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cacheLife, cacheTag } from "next/cache"

export const getAllTestimonials=async () => {
    'use cache'
    cacheTag("testimonials")
    cacheLife("hours")
    const testimonials=await db.testimonials.findMany()
    return testimonials
}
export const getApprovedTestimonials=async () => {
    try {
        const testimonials=await db.testimonials.findMany({
            where:{isApproved:true},
            include:
            {user:{
                select:{
                    username:true,
                    profession:true
                }}
            }
        })
        return {
            data:testimonials,
            error:null
        }
    } catch (error) {
        return {
            error:error instanceof Error?error.message:"Server Error",
            data:[]
        }
    }
}

export async function createTestimonial(data:Testimonials) {
    const user=await auth()
    const userId=Number(user?.user?.id)
    data.userId=userId
    if (!user)redirect('/login')
    await db.testimonials.create({
        data
    })
}
export const deleteTestimonial=async(id:number)=>{
    const testimonial=await db.testimonials.delete({where:{id}})
    revalidatePath('/admin/testimonials')
    return testimonial
} 

export const updateTestimonial=async(id:number,data:Testimonials)=>{
    const testimonial=await db.testimonials.update({where:{id},data})
    revalidatePath('/admin/testimonials')
    return testimonial
} 