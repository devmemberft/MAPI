import { useState } from "react"
import { keyRegister } from "../utils/apiClient";

export function useRegister(onSuccess?: () => void){
    const [captcha_value,setCaptchaValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg,setErrorMsg] = useState("");

    const handleRegister = async(e:React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try{
            const registration = await keyRegister(captcha_value);
            if(registration.success){onSuccess?.() }else{ setErrorMsg(`Captcha value invalid. Try again or Contact support. `); }
        }catch(error:any){setErrorMsg('Incorrect Captcha. Try again or Contact API support. ')} finally{ setLoading(false); }
    }

    return {captcha_value,setCaptchaValue,loading,setLoading,errorMsg,setErrorMsg,handleRegister,};

}