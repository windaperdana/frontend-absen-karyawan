// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('email');
  // if (userStr) return JSON.parse(userStr);
  if (userStr) return userStr;
  else return null;
}

// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}
export const getTokenAdmin = () => {
  return sessionStorage.getItem('token_admin') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('role_login');
}

// set the token and user from the session storage
export const setUserSession = (token, email, role_login) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('role_login', role_login);
}