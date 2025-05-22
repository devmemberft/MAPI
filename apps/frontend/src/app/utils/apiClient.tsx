import axios from 'axios';
import * as dotenv from 'dotenv';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    headers: {
        'Content-Type':'application/json',
    },
});

export const getData = async <T = any>(endpoint:string): Promise<T> => {
    const response = await api.get<T>(endpoint);
    return response.data;
};

export const postData = async <T = any>(endpoint:string, data:any) => {
    const response = await api.post<T>(endpoint,data);
    return response.data;
}
// putData, deleteData, etc.