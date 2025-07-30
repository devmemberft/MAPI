import { useState } from "react";
import { keyLogin } from "../utils/apiClient";

export function useLogin(onSuccess?: () => void){
    const [access_key, setAccessKey] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async(e:React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try{
            const res = await keyLogin(access_key); // solo se toma el valor ingresado en la solicitud
            if(res.success){
                onSuccess?.();
            }else{
                setErrorMsg("Access Key invalid. Try again or Contact support.");
            }
        } catch(error:any){ setErrorMsg(`Error Login In. Contact API support.`); } finally{ setLoading(false); }
        
    };
    return {
        handleLogin,access_key,setAccessKey,errorMsg,setErrorMsg,loading,setLoading,
    };
}

