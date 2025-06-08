import { useState } from "react";
import { postData } from "../utils/apiClient";

export function useLogin(onSuccess?: () => void){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        try{
            const res = await postData("/auth/login", { email, password });
            console.log("Login response", res);
            
            if(res.access_token) {
                onSuccess?.();
            } else {
                setErrorMsg("Invalid Credentials, try again or contact support.");
            }
        } catch (error:any) {
            setErrorMsg(error.message || "Error Loging In.");
        } finally {
            setLoading(false);
        }
    };

    return {
        email,setEmail,password,setPassword,errorMsg,loading,handleLogin,
    };
}