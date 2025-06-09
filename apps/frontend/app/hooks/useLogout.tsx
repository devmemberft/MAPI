import { logout as logoutRequest } from "../utils/apiClient"

export const useLogout = () => {
    return async () => {
        await logoutRequest();
        window.location.href='/login';
    }
}