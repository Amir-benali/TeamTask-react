import axios from 'axios';

const API_URL = 'http://localhost:5000/auth'; 

const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(API_URL + '/login', credentials);
  
  if (response.data) {
    localStorage.setItem('token', JSON.stringify(response.data));
  }
  return response.data;
};

const getUser =  async () => {
    const user = JSON.parse(localStorage.getItem('token'));
    const response = await axios.get(API_URL + '/current-user', {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    });
    console.log(response);
    return response.data;
}

const logout = () => {
  localStorage.removeItem('token');
};

const authApi = {
  register,
  login,
  getUser,
  logout
};

export default authApi;