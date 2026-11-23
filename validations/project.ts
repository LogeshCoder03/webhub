import z from 'zod'
import { ProjectType as MainProjectType,Domain,FrontendTech,BackendTech,Language,Database, MobileFrontend  } from '@/lib/generated/prisma/enums'

export const MentorProjectSchema=z.object({
    technology:z.string(),
    domain:z.enum(Domain)
})

export const SupportedProjectSchema=z.object({
    description:z.string().min(12,'Description contails more than 12 chars'),
    projectType:z.enum(MainProjectType),
    projectName:z.string(),
})

export type MentorProjectType=z.infer<typeof MentorProjectSchema>
export type SupportedProjectType=z.infer<typeof SupportedProjectSchema>

export type OtherProjectType=MentorProjectType & SupportedProjectType


export const WebCommanSchema=z.object({
    name:z.string().min(4,"Project name must contain atleast 4 charcters"),
    description:z.string().min(12,'Project description must contain atleast 12 charcters"'),
    projectType:z.enum(MainProjectType),
})

export const FrontendEndSchema=z.object({
    frontendTech:z.enum(FrontendTech),
    ztype:z.literal('frontend')
}).extend(WebCommanSchema.shape)

export const BackendEndSchema=z.object({
    backendTech:z.enum(BackendTech),
    database:z.enum(Database),
    ztype:z.literal('backend')
}).extend(WebCommanSchema.shape)

export const FullStackSchema=z.object({
    frontendTech:z.enum(FrontendTech),
    ztype:z.literal('fullstack'),
    backendTech:z.enum(BackendTech),
    database:z.enum(Database),
}).extend(WebCommanSchema.shape)

export const MobileAppSchema=z.object({
    mobileFrontend:z.enum(MobileFrontend),
    backendTech:z.enum(BackendTech),
    database:z.enum(Database),
    ztype:z.literal('mobileapp')
}).extend(WebCommanSchema.shape)

export const OtherWebSchema=z.object({
    language:z.enum(Language),
    ztype:z.literal('other')
}).extend(WebCommanSchema.shape)

export const WebProjectSchema=z.discriminatedUnion('ztype',
    [FrontendEndSchema,BackendEndSchema,FullStackSchema,MobileAppSchema,OtherWebSchema]
)

type CustomService={
    service:string
} 

export type CreateWebProjectType=z.infer<typeof WebCommanSchema> & z.infer<typeof FullStackSchema> & z.infer<typeof OtherWebSchema> & CustomService