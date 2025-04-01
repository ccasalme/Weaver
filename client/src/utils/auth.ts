// client/src/utils/auth.ts

export const setToken = (token: string) => {
	localStorage.setItem("token", token);
  };
  
  export const getToken = () => {
	return localStorage.getItem("token");
  };
  
  export const isLoggedIn = () => {
	return !!getToken();
  };
  
  export const logout = () => {
	localStorage.removeItem("token");
	window.location.href = "/";
  };
  