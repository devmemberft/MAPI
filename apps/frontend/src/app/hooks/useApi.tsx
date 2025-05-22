'use client';

import { useEffect, useState } from "react";
import { getData } from "../utils/apiClient";

export function useApi<T= any>(endpoint:string) {

    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(()=>{
        let cancel = false;

        const fetchData = async () => {
            try{
                const result = await getData<T>(endpoint);
                if(!cancel){ 
                    setData(result); 
                }
            }catch(error:any){
                if(!cancel) { setError(error.message || 'Error fetching data.'); }
            }finally{
                if(!cancel){ setLoading(false); }
            }
        };
        
        fetchData();

        return () => {
            cancel = true;
        };

    },[endpoint]);

    return { data, loading, error };
}