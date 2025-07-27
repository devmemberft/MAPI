import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then(res => res.json());

export function useClientsSearch({dni,name}: {dni?:string;name?:string}) {
    const queryParams = new URLSearchParams();

    if(dni) queryParams.append('client_dni',dni);
    if(name) queryParams.append('client_name',name);

    const url = `/clients/search?${queryParams.toString()}`;

    const { data, isLoading, error } = useSWR((dni || name) ? url: null, fetcher);

    return {
        clients:data,
        error,
        loading: isLoading,
    };
}