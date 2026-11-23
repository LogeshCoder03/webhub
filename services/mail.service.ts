import nodemailer from 'nodemailer'

const transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:Number(process.env.EMAIL_PORT),
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
})

export const sendMail=async(email:string,subject:string,body:string)=>{
    await transporter.sendMail({
        to:email,
        subject,
        html:body
    })
} 