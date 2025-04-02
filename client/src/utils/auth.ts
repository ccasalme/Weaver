// client/src/utils/auth.ts

export const setToken = (token: string) => {
	localStorage.setItem("id_token", token); // ✅ Match ApolloClient
};

export const getToken = () => {
	return localStorage.getItem("id_token"); // ✅ Match ApolloClient
};

export const isLoggedIn = () => {
	return !!getToken();
};

export const logout = () => {
	localStorage.removeItem("id_token"); // ✅ Match ApolloClient
	window.location.href = "/";
};
