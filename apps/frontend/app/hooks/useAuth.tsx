import useSWR from "swr";
import { getProfile } from "../utils/apiClient";
import { mutate } from "swr";

export const useAuth = () => {

    const { data:user, error, isLoading } = useSWR('/auth/profile',getProfile);

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        refreshAuth: mutate,
    };
    
}