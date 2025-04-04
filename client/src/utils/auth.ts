//Should dynammically read token on every request
//Uses ApolloLink to set the token in the header
//Validates token against the actual server me query
//Automatically logs out the user if the token is invalid or expired

import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	gql,
	ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: "/graphql",
});

// ✅ Add token dynamically to each request
const authLink = setContext(() => {
	const token = localStorage.getItem("id_token");
	return {
		headers: {
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: ApolloLink.from([authLink, httpLink]),
	cache: new InMemoryCache(),
});

// ✅ Query to check if token is valid
const GET_ME = gql`
	query Me {
		me {
			_id
			username
			email
		}
	}
`;

export const setToken = (token: string, userId?: string) => {
	localStorage.setItem("id_token", token);
	if (userId) localStorage.setItem("user_id", userId);
};

export const getToken = () => {
	return localStorage.getItem("id_token");
};

export const isLoggedIn = async (): Promise<boolean> => {
	const token = getToken();
	if (!token) return false;

	try {
		const { data } = await client.query({ query: GET_ME });
		return !!data?.me?._id;
	} catch (err) {
		console.warn("🔒 Invalid or expired token:", err);
		logout();
		return false;
	}
};

export const logout = () => {
	localStorage.removeItem("id_token");
	localStorage.removeItem("user_id");
	window.location.href = "/";
};
