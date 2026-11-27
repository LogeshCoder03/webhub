import { verifyTokenAction } from "@/actions/authActions"
import { redirect } from "next/navigation"


const VerifyUser = async({searchParams}:{searchParams:Promise<{token:string}>}) => {
    const {token}=await searchParams
    if (!token) {
        redirect('/login')
    }
    await verifyTokenAction(token)
    return (
        <div>VerifyUser</div>
    )
}

export default VerifyUser