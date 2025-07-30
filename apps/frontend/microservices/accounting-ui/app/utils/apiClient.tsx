import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api-purple-smoke-666.fly.dev',
    withCredentials: true,
    
    headers: {
        'Content-Type':'application/json',
    },
});

export const getData = async <T = any>(endpoint:string): Promise<T> => {
    try{
        const response = await api.get<T>(endpoint);
        return response.data;
    } catch(error:any) {
        throw error.response?.data || { message: "Unexpected error."};
    }
};

export const postData = async <T = any>(endpoint:string, data:any): Promise<T> => {
    try{
        const response = await api.post<T>(endpoint,data);
        return response.data;
    } catch(error:any) {
        throw error.response?.data || { message: "Unexpected error."};
    }
}

export const patchData = async <T = any>(endpoint:string, data:any): Promise<T> => {
    try{
        const response = await api.patch<T>(endpoint,data);
        return response.data;
    }catch(error:any){ throw error.response?.data || { message: "An Error has occurred, visit api configuration. "}; }
}

export const credentialsLogin = async (email:string,password:string) => {
    return await postData<{ access_token:string }>('/auth/login',{email,password});
}

export const credentialsLogout = async () => {
        return await api.post('/auth/logout');
};

export const keyLogin = async(access_key:string) => {
    return await postData<{success:boolean}>('/api/finances/auth/login',{access_key});
}

export const keyLogout = async () => {
    try{
        const res = await api.post('/api/finances/auth/logout');
        return res;
    }catch(err:any){throw err} 
}

export const keyRegister = async (captcha_value:string) => {
    return await postData<{success:boolean}>('/api/finances/auth/register',captcha_value);
}

export const generateCatpcha = async() => {
    try{
        const res =  await getData('/api/finances/auth/captcha');
        if(res){
            return res.captcha_value;
        }else{
            res?.error;
        }
        
    }catch(err:any){throw err}
}

export const getProfile = async (email:any) => {
    return await api.get('auth/profile', email); // endpoint protegido que da info del usuario
}

// putData, deleteData, etc.