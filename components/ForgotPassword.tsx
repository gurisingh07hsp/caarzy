"use client"
import OTPDialog from '@/components/OTPDialog'
import { useSearchParams } from "next/navigation";
const ForgotPassword = () => {

  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  
  return (
    <div>
      <OTPDialog email={email}/>
    </div>
  )
}

export default ForgotPassword