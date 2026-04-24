import axios from 'axios';

// create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ci_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// handle common response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if server returns 401, token might be expired
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('ci_token');
      localStorage.removeItem('ci_user');
      // redirect to login if not already there
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
