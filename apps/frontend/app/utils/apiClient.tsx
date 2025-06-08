import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
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

export const login = async (email:string,password:string) => {
    return await postData<{ access_token:string }>('/auth/login',{email,password});
}


export const logout = async () => {
        return await postData("/auth/logout",{ method: "POST", credentials: "include" });
        // mutate(null);
};

export const getProfile = async () => {
    return await getData('auth/profile'); // endpoint protegido que da info del usuario
}
// putData, deleteData, etc.