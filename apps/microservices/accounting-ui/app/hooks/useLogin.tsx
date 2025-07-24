import { useState } from "react";
import { postData } from "../utils/apiClient";

export function useLogin(onSuccess?: () => void){
    const [accessKey, setAccessKey] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async(e:React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try{
            const res = await postData("api/finances/auth/login", {accessKey});
            if(res.accessKey){
                onSuccess?.();
            }else{
                setErrorMsg("Access Key invalid. Contact support.");
            }
        } catch(error:any){ setErrorMsg("Error Login In. Contact API support."); } finally{ setLoading(false); }
        
    };
    return {
        handleLogin,accessKey,setAccessKey,errorMsg,setErrorMsg,loading,setLoading,
    };
}