export const TOKEN_KEY = "@Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUserName = () => localStorage.getItem('USER_NAME');

export const getUserId = () => localStorage.getItem('USER_ID');

export const login = (token, user_name, _id, avatar) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem('USER_NAME', user_name);
  localStorage.setItem('USER_ID', _id);
  localStorage.setItem('AVATAR', avatar);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};