import axios from 'axios';
import API_URL from './API_URL';


const AuthService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email: userData.email,
        password: userData.password,
        role: userData.role || 'client',
        status: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default AuthService;