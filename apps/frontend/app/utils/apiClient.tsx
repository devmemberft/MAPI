import axios from 'axios';
import * as dotenv from 'dotenv';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
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

export const postData = async <T = any>(endpoint:string, data:any) => {
    try{
        const response = await api.post<T>(endpoint,data);
        return response.data;
    } catch(error:any) {
        throw error.response?.data || { message: "Unexpected error."};
    }
}

export const login = async (email:string,password:string) => {
    return await postData<{ token:string }>('/auth/login',{email,password});
}
// putData, deleteData, etc.