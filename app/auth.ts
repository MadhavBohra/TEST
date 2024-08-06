import axios from 'axios';

export let authenticated = false;
export let token = '';

export const setAuthenticated = (status: boolean, newToken?: string) => {
  authenticated = status;
  if (newToken) {
    token = newToken;
    localStorage.setItem('token', newToken);
  } else {
    localStorage.removeItem('token');
  }
};

export const loadAuthState = () => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    token = storedToken;
    authenticated = true;
  } else {
    authenticated = false;
    token = '';
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('/api/login', { username, password });
    const newToken = response.data.token;
    setAuthenticated(true, newToken);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = () => {
  setAuthenticated(false);
  localStorage.removeItem('token');
};