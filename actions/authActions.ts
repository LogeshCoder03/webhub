'use server'
import { signIn, signOut } from "@/auth"
import { userRegister, createVerificationToken, deleteUser, resetPassword, updateUser, verifyToken, setResetToken, createUser } from "@/services/auth.service";
import { User } from "@/lib/generated/prisma/client";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { sendMail } from "@/services/mail.service";
import { SignUpType } from "@/validations/auth";

export const userLogin=async(data:FormData)=>{    
    const email=data.get('email')
    const password=data.get('password')
    try {
        await signIn('credentials',{
            redirect:false,
            email,
            password,
        })
    } catch (error) {
        const someError = error as CredentialsSignin;
        return someError.cause?.err;
    }
    redirect('/')
}

export const registerUser=async(data:SignUpType)=>{
    try {
        const {id,email,username}=await userRegister(data)
        const token=await createVerificationToken(id,email)
        const verifyUrl=`${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`
        const mail=`Hi ${username},
        Thank you for registering with us.
        Please verify your email address to activate your account.

        Click the button below to confirm your email:
        <a href="${verifyUrl}">Verify</a>

        If you did not create this account, please ignore this email.

        — Team WebHub`
        await sendMail(email,"Confirm your account",mail)
        return {
            isSuccess:true,
            message:"Your account is created successfully.The verification mail is send to your registred mail."
        }
    } catch (error) {
       return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Error"
       }
    }
    // redirect('/login')
}

export const logOut=async () => {
        await signOut()
}

export const deleteUserAction=async (id:number) => {
    try {
        await deleteUser(id)
        return {
            isSuccess:true,
            message:"User deleted successfully"
        }
    } catch (error) {
         return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Error"
        }
    }
}

export const updateUserAction=async (id:number,data:User) => {
    try {
    await updateUser(id,data)
        return {
            isSuccess:true,
            message:"User updated successfully"
        }
    } catch (error) {
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Error"
        }
    }
}

export const resetPasswordAction=async (token:string,formData:FormData) => {
    try{
        const password=formData.get("password") as string
        await resetPassword(token,password)
        return {
            isSuccess:true,
            message:"Password changed successfully"
        }
    }catch(error){
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Error"
        }
    }
}

export const forgotPasswordAction=async(formData:FormData)=>{
    try {
        const formEmail=formData.get("email") as string
        const {token,email}=await setResetToken(formEmail)
        const resetPasswordLink=`${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`
        const mail=`
            We received a request to reset your password.

            Click the link below to create a new password:
            <a href="${resetPasswordLink}">Reset Password</a>

            This link will expire in 15 minutes for security reasons.

            If you did not request a password reset, please ignore this email. Your account remains secure.
        `
        await sendMail(email,"Reset Your Password",mail)
        return {
            isSuccess:true,
            message:"Password reset instructions have been sent to your email address"
        }
    } catch (error) {
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Error"
        }
    }
}
export async function verifyTokenAction(token:string) {
    try {
        await verifyToken(token)
        redirect("/login")
    } catch (error) {
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Error"
        }
    }
}
export async function createUserAction(user:User) {
    try {
        await createUser(user)
        return {
            isSuccess:false,
            message:"User created successfully"
        }
    } catch (error) {
        return {
            isSuccess:false,
            message:error instanceof Error?error.message:"Server Error"
        }
    }
}