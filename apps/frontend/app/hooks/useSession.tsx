/*
import useSWR from "swr";

const fetcher = (url:string) => fetch(url).then((res) => res.json());

export function useSession() {
    const { data, error, isLoading } = useSWR('/api/session', fetcher);

    return {
        session: data,
        isLoading,
        isLoggedIn: !!data?.user,
        error,
    };
}

*/