import api from '../../services/Api';
import { setError, changeRegisterPage } from './formActions';

export function changeUser(user) {
  return {
    type: 'USER_CHANGED',
    payload: user
  }
}

export function changeToken(token) {
  return {
    type: 'TOKEN_CHANGED',
    payload: token
  }
}

export function updateUser(userInfo, history) {
  return async (dispatch) => {
    try {
      await api.put(`/user/${userInfo._id}`, userInfo);
      history.push('/app');
      dispatch(changeUser(userInfo));
    } catch (err) {
      alert('Algo deu errado');
    }
  }
}

export function login(credentials, history) {
  return async (dispatch) => {
    try {
      const response = await api.post('/user/login', credentials);
      const { token, user } = response.data;
      console.log(user);
      dispatch(changeUser(user));
      dispatch(changeToken(token));
      dispatch(setError(''));
      history.push('/app')
    } catch (err) {
      dispatch(setError('Login/senha incorretos.'))
    }
  }
}

export function register(credentials) {
  return (dispatch) => {
    try {
      api.post('/user', credentials);
      dispatch(setError(''));
      dispatch(changeRegisterPage(false));
    } catch (err) {
      dispatch(setError('Ocorreu um problema, tente novamente.'))
    }
  }
}