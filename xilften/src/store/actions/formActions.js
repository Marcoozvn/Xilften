export function setError(error) {
  return {
    type: 'ERROR_CHANGED',
    payload: error
  }
}

export function changeUsername(username) {
  return {
    type: 'USERNAME_CHANGED',
    payload: username
  }
}

export function changePassword(password) {
  return {
    type: 'PASSWORD_CHANGED',
    payload: password
  }
}

export function changeEmail(email) {
  return {
    type: 'EMAIL_CHANGED',
    payload: email
  }
}

export function changeName(name) {
  return {
    type: 'NAME_CHANGED',
    payload: name
  }
}

export function changeConfirmPassword(confirmPassword) {
  return {
    type: 'CONFIRMPASSWORD_CHANGED',
    payload: confirmPassword
  }
}

export function changeRegisterPage(value) {
  return dispatch => {
    dispatch(setError(''));
    dispatch({
      type: 'REGISTERPAGE_CHANGED',
      payload: value
    })
  }
}