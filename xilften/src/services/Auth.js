export const TOKEN_KEY = 'persist:root';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => {
  return localStorage.getItem('token');
  //return JSON.parse(localStorage.getItem(TOKEN_KEY))['token'].replace("\"", '').replace("\"", '');
};

export const getUserId = () => localStorage.getItem('USER_ID');

export const login = (token, user_name, _id, avatar) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};