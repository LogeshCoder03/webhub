"use server"

import { Testimonials } from "@/lib/generated/prisma/client"
import { createTestimonial, deleteTestimonial, updateTestimonial } from "@/services/testimonial.service"

export const createTestimonialAction=async(data:Testimonials)=>{
    try{
        await createTestimonial(data)
        return {
            isSuccess:true,
            message:"Thanks for your feedback."
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}

export const deleteTestimonialAction=async(id:number)=>{
    try{
        await deleteTestimonial(id)
        return {
            isSuccess:true,
            message:"Testimonial deleted successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}
export const updateTestimonialAction=async(id:number,data:Testimonials)=>{
    try{
        await updateTestimonial(id,data)
        return {
            isSuccess:true,
            message:"Testimonial updated successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Error occured"
        }
    }
}