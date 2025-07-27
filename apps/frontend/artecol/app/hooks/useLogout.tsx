import { logout as logoutRequest } from "../utils/apiClient"
import { mutate } from "swr";

export const useLogout = () => {
    return async () => {
        await logoutRequest();
        mutate(null); // para borrar el perfil cacheado, no el autenticado
        window.location.href='/login';
    }
}