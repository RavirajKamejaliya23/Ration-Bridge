import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: '/api', // Use proxy in development, '/api' in production
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData: any) => api.put('/users/profile', profileData),
  getUsers: () => api.get('/users'),
};

export const foodAPI = {
  getFoodItems: () => api.get('/food'),
  createFoodItem: (foodData: any) => api.post('/food', foodData),
  getFoodItem: (id: string) => api.get(`/food/${id}`),
  updateFoodItem: (id: string, foodData: any) => api.put(`/food/${id}`, foodData),
  deleteFoodItem: (id: string) => api.delete(`/food/${id}`),
  requestFood: (id: string, requestData: any) => api.post(`/food/${id}/request`, requestData),
};

export default api;
