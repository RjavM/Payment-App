import axios from "axios"
import { API_ENDPOINTS, getAuthHeaders, handleApiError } from "../config/api"

export const getBalance = async () => {
    try {
        const token = localStorage.getItem("token");
        
        if (!token) {
            console.warn("No token found in localStorage");
            return null;
        }
        
        const res = await axios.get(API_ENDPOINTS.BALANCE, {
            headers: getAuthHeaders()
        });
        
        if (res.data && typeof res.data.balance === 'number') {
            return res.data.balance;
        } else {
            console.warn("Invalid response format from getBalance");
            return null;
        }
    }
    catch(error) {
        const errorInfo = handleApiError(error);
        console.error("Error fetching balance:", errorInfo);
        
        // If token is invalid, remove it from localStorage
        if (errorInfo.status === 401 || errorInfo.status === 403) {
            localStorage.removeItem("token");
        }
        
        return null;
    }
}
