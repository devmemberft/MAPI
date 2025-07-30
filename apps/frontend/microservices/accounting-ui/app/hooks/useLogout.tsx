import { useState } from "react";
import { keyLogout } from "../utils/apiClient";

export function useLogout(onSuccess?: () => void){
    const [loading,setLoading] = useState(false);
    const [errorMsg,setErrorMsg] = useState("");

    const handleLogout = async() => {
        setLoading(true);
        setErrorMsg("");
        try{
            console.log('probando endpoint');
            const logout = await keyLogout();
            console.log(logout.status);
            if(logout){
                onSuccess?.() 
                return 'Sesion cerrada exitosamente';
            }
            else{
                setErrorMsg('Verifica conexion a internet e intentalo nuevamente, de lo contrario comunicate con soporte.')
            }
            
        }catch(error:any){ setErrorMsg(`Error during the logout process: ${error.message}`); }
    }
    return {errorMsg,loading,setLoading,handleLogout,};
}