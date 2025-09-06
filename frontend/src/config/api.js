// API Configuration
// This file centralizes all API endpoints and configuration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const API_ENDPOINTS = {
    // User endpoints
    SIGNUP: `${API_BASE_URL}/user/signup`,
    SIGNIN: `${API_BASE_URL}/user/signin`,
    USER_INFO: `${API_BASE_URL}/user/me`,
    USER_BULK: `${API_BASE_URL}/user/bulk`,
    USER_UPDATE: `${API_BASE_URL}/user`,
    
    // Account endpoints
    BALANCE: `${API_BASE_URL}/account/balance`,
    TRANSFER: `${API_BASE_URL}/account/transfer`,
};

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': token || '',
        'Content-Type': 'application/json',
    };
};

// Helper function to handle API errors
export const handleApiError = (error) => {
    if (error.response) {
        // Server responded with error status
        return {
            message: error.response.data?.msg || 'Server error',
            status: error.response.status,
            data: error.response.data
        };
    } else if (error.request) {
        // Request was made but no response received
        return {
            message: 'Network error - please check your connection',
            status: 0,
            data: null
        };
    } else {
        // Something else happened
        return {
            message: error.message || 'Unknown error occurred',
            status: 0,
            data: null
        };
    }
};
