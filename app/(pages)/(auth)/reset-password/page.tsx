import ResetPasswordClient from "@/components/auth/ResetPasswordClient"


const ResetPassword = async({searchParams}:{searchParams:Promise<{token:string}>}) => {
    const {token}=await searchParams
    return (
        <ResetPasswordClient token={token}/>
    )
}

export default ResetPassword