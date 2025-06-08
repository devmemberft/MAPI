import { logout } from "../utils/apiClient"

export const useLogout = () => {
    return async () => {
        await logout();
        window.location.href='/login';
    }
}