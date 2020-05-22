export function changeToken(token) {
  return {
    type: 'TOKEN_CHANGED',
    payload: token
  }
}