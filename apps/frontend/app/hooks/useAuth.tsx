import useSWR from "swr";
import { getProfile } from "../utils/apiClient";

export const useAuth = () => {

    const { data:user, error, isLoading, mutate } = useSWR('/auth/profile',getProfile);

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        refreshAuth: mutate,
    };
    
}