'use server'
import { OtherProjects, WebProjects } from "@/lib/generated/prisma/client";
import { sendNotification } from "@/services/notification.service";
import { db } from "@/lib/db";
import { createOtherProject, createWebProject, deleteOtherProject, deleteWebProject, updateOtherProject, updateWebProject } from "@/services/project.service";
import { auth } from "@/auth";

export const createWebProjectAction=async (data:WebProjects) => {
    try{
        const session=await auth()
        if (!session?.user) {
            return
        }
        const project=await createWebProject(data)
        await sendNotification({
            title:"Project Created",
            message:`the ${project.name} web project is created successfully`,
            type:"update",
        })
        return {isSuccess:true,message:"Project created successfully"}
    }catch(error){
        return {isSuccess:false,message:error instanceof Error?error.message:"Server Error"}
    }
}

export const createOtherProjectAction=async (data:OtherProjects) => {
    try{
        const session=await auth()
        if (!session?.user) {
            return
        }
        const project=await createOtherProject(data)
        await sendNotification({
            title:"Project Created",
            message:`the ${project.projectName?project.projectName+"Project":project.technology + "Mentorship"} is created successfully`,
            type:"update",
        })
        return {isSuccess:true,message:"Project created successfully"}
    }catch(error){
        return {isSuccess:false,message:error instanceof Error?error.message:"Server Error"}
    }
}

export const deleteWebProjectAction=async (id:number) => {
    try {
        await deleteWebProject(id)
        return {
            isSuccess:true,
            message:"Project deleted successfully"
        }   
    } catch (error) {
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Occured"
        }   
    }
}
export const deleteOtherProjectAction=async (id:number) => {
    try {
        await deleteOtherProject(id)
        return {
            isSuccess:true,
            message:"Project deleted successfully"
        }   
    } catch (error) {
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Occured"
        }   
    }
}

export const updateWebProjectAction=async (id:number,data:WebProjects) => {
    try {
        await updateWebProject(id,data)
        return {
            isSuccess:true,
            message:"Project updated successfully"
        }   
    } catch (error) {
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Occured"
        }   
    }
}

export const updateOtherProjectAction=async (id:number,data:OtherProjects) => {
    try {
        await updateOtherProject(id,data)
        return {
            isSuccess:true,
            message:"Project updated successfully"
        }   
    } catch (error) {
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Occured"
        }   
    }
}

export const projectIsverified=async (key:string,type:"web"|"others")=>{
    if (type==="web") {
            const project=await db.webProjects.findUnique({where:{
            secreatKey:key
        }})
        return project?.isVerified
    }else if(type==="others"){
            const project=await db.otherProjects.findUnique({where:{
            secreatKey:key
        }})
        return project?.isVerified
    }else{
        return false
    }
} 