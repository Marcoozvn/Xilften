const INITIAL_STATE = {
  username: '',
  password: '',
  name: '',
  email: '',
  confirmPassword: '',
  error: '',
  registerPage: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'USERNAME_CHANGED':
      return { ...state, username: action.payload };
    case 'PASSWORD_CHANGED':
      return { ...state, password: action.payload };
    case 'EMAIL_CHANGED':
      return { ...state, email: action.payload };
    case 'NAME_CHANGED':
      return { ...state, name: action.payload };
    case 'CONFIRMPASSWORD_CHANGED':
      return { ...state, confirmPassword: action.payload };
    case 'ERROR_CHANGED':
      return { ...state, error: action.payload };
    case 'REGISTERPAGE_CHANGED': 
      return { ...state, registerPage: action.payload };
    default:
      return state;
  }
}