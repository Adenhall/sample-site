// use localStorage to store the token info, which might be sent from server in actual project.
export function getToken() {
  const tokenString = localStorage.getItem('token');
  let token;
  try {
    token = JSON.parse(tokenString) || {};
  } catch (e) {
    token = {};
  }
  return token;
}

export function setToken(token) {
  return localStorage.setItem('token', JSON.stringify(token));
}
