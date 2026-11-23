'use server'
import { auth } from "@/auth";
import {db} from "@/lib/db";
import { OtherProjects, WebProjects } from "@/lib/generated/prisma/client";
import { createSecreatKey } from "@/lib/passkey";
import { revalidatePath } from "next/cache";
import { cacheLife, cacheTag } from "next/cache"

export const getAllWebProjects=async () => {
    'use cache'
    cacheTag("webprojects")
    cacheLife("hours")
    const projects=await db.webProjects.findMany()
    return projects
}

export const getAllOtherProjects=async () => {
    'use cache'
    cacheTag("otherprojects")
    cacheLife("hours")
    const projects=await db.otherProjects.findMany()
    return projects
}

export async function createWebProject(rawData:WebProjects) {
    const session=await auth()
    if (!session?.user) {
        throw new Error('Not Authenticated')
    }
        const {name,description,mobileFrontend,projectType,frontendTech,backendTech,database,language,service}=rawData
        const projectData={
            name,
            description,
            projectType,
            backendTech,
            frontendTech,
            database,
            language,
            service,
            mobileFrontend,
            userId:parseInt(session?.user.id!)
        }
        const project=await db.webProjects.create(
        {data:projectData})
        const secreatKey=createSecreatKey(project.id)
        const updatedProject=await db.webProjects.update({
            where:{
                id:project.id
            },
            data:{
                secreatKey:secreatKey
            },include:{user:{
                select:{username:true}
            }}
        })
        return updatedProject
}

export const createOtherProject=async (data:OtherProjects) => {
    const session=await auth()
    if (!session?.user) {
        throw new Error('Not Authenticated')
    }
    data.userId=parseInt(session.user.id!)
    const project=await db.otherProjects.create({data:data})
    const secreatKey=createSecreatKey(project.id)
    const updatedProject=await db.otherProjects.update({
        where:{
            id:project.id
        },
        data:{
            secreatKey:secreatKey
        },include:{user:{
            select:{username:true}
        }}
    })
    return updatedProject
}

export const deleteWebProject=async (id:number) => {
    await db.webProjects.delete({where:{id}})
    revalidatePath('/admin/projects/web')
    return {message:"Project Deleted"}
}

export const deleteOtherProject=async (id:number) => {
    await db.otherProjects.delete({where:{id}})
    revalidatePath('/admin/projects/others')
}

export const updateWebProject=async (id:number,data:WebProjects) => {
    const project=await db.webProjects.update({where:{id},data})
    if (project.isVerified){
        await db.notification.create({
            data:{
                message:`Your ${project.name} project has been successfully verified and is ready to proceed`,
                title:"Project Verified",
                type:"update",
                userId:project.userId
            }
        })
    }
    revalidatePath('/admin/projects/web')
}

export const updateOtherProject=async (id:number,data:OtherProjects) => {
    const project=await db.otherProjects.update({where:{id},data})
        await db.notification.create({
            data:{
                message:`Your ${project.projectName?project.projectName:project.domain} project has been successfully verified and is ready to proceed`,
                title:"Project Verified",
                type:"update",
                userId:project.userId
            }
        })
    revalidatePath('/admin/projects/others')
}

export const getProjects=async () => {
    try {
        const webProjects=await db.webProjects.findMany({take:2})
        const otherProjects=await db.otherProjects.findMany({take:2})
        const projects=[...webProjects,...otherProjects]   
        return {
            isSuccess:true,
            projects
        }
    } catch (error) {        
        return {
            isSuccess:false,
            error:error
        }
    }
}
export const getUserProjects=async () => {    
    const session=await auth()
    if (!session) {
        throw new Error("")
    }
    const userId=session.user?.id
    try {
        const webProjects=await db.webProjects.findMany({where:{
            userId:parseInt(userId!)
        }})
        const otherProjects=await db.otherProjects.findMany({
            where:{
                userId:parseInt(userId!)
            }
        })
        const webProjectsCount=webProjects.length
        const otherProjectsCount=otherProjects.length
        const totalProjectsCount=webProjectsCount+otherProjectsCount
        const ongoing=webProjects.filter(proj=>proj.status==="ongoing").length
        const upcoming=webProjects.filter(proj=>proj.status==="upcoming").length
        const completed=webProjects.filter(proj=>proj.status==="completed").length
        return {
            isSuccess:true,
            webProjects,
            otherProjects,
            webProjectsCount,
            otherProjectsCount,
            ongoing,
            completed,
            totalProjectsCount,
            upcoming
        }
    } catch (error:Error|any) {
        return {
            isSuccess:false,
            error:error.message
        }
    }
}

export const getWebProject=async (id:number) => {
    const project=await db.webProjects.findUnique({where:{id}})
    if (!project) {
        return
    }
    return project
}

export const getOtherProject=async (id:number) => {
    const project=await db.otherProjects.findUnique({where:{id}})
    if (!project) {
        return
    }
    return project
}
export async function checkProjectUser(key:string,projectType:"web"|"others") {
    const session=await auth()
    if (projectType==="web") {
        const project=await db.webProjects.findFirst({
            where:{
                secreatKey:key
            }
        })
        if ((Number(session?.user?.id)!==project?.userId)&&(!session?.user?.isSuperUser)) {
            return false
        }
    } 
    if (projectType==="others") {
        const project=await db.otherProjects.findFirst({
            where:{
                secreatKey:key
            }
        })
        if ((Number(session?.user?.id)!==project?.userId)||(!session?.user?.isSuperUser)) {
            return false
        }
    } 
    return true
}