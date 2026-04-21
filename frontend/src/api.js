/**
 * Heritage Brews — Frontend API Utility
 * Centralized fetch logic with JWT handling.
 */

let BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/';
if (!BASE_URL.endsWith('/')) {
    BASE_URL += '/';
}

/**
 * Generic API request wrapper
 */
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('access_token');

    const headers = {
        ...options.headers,
    };

    // Only set Content-Type to application/json if body is not FormData
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    // Stringify body only if it's not FormData and not already a string
    if (config.body && !(config.body instanceof FormData) && typeof config.body !== 'string') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        // Handle token expiration / unauthorized
        if (response.status === 401 && token) {
            // Potential refresh token logic here
            localStorage.removeItem('access_token');
            window.location.href = '/login'; // Or handle via AuthContext
            return null;
        }

        const data = await response.json();
        if (!response.ok) {
            // Extract the most meaningful error message
            let errorMessage = data.detail || data.error || data.message;
            
            if (!errorMessage && typeof data === 'object') {
                // DRF validation errors look like: { "field": ["error msg"] }
                errorMessage = Object.values(data).flat().shift();
            }
            
            throw new Error(errorMessage || 'Something went wrong');
        }
        return data;
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

export const api = {
    get: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'GET' }),
    post: (endpoint, body, options = {}) => apiRequest(endpoint, { ...options, method: 'POST', body }),
    put: (endpoint, body, options = {}) => apiRequest(endpoint, { ...options, method: 'PUT', body }),
    patch: (endpoint, body, options = {}) => apiRequest(endpoint, { ...options, method: 'PATCH', body }),
    delete: (endpoint, options = {}) => apiRequest(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
