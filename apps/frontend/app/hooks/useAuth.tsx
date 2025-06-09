import useSWR from "swr";
import { getProfile, logout as logoutRequest } from "../utils/apiClient";
import { mutate } from "swr";

export const useAuth = () => {

    const { data:user, error, isLoading } = useSWR('/auth/profile',getProfile);

    const logout = async() => {
        await logoutRequest();
        mutate(null); // para borrar el perfil cacheado, no el autenticado
    }
    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        logout,
        error,
        refreshAuth: mutate,
    };
    
}