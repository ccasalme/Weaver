import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	from,
  } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";
  import { setContext } from "@apollo/client/link/context";
  
  // ✅ HTTP link to your GraphQL server (proxied)
  const httpLink = createHttpLink({
	uri: "/graphql",
  });
  
  // ✅ Error handler for Apollo
  const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
	  for (const err of graphQLErrors) {
		if (err.message.includes("Invalid token") || err.message.includes("jwt") || err.extensions?.code === "UNAUTHENTICATED") {
		  console.warn("⛔ Token error detected. Clearing localStorage...");
		  localStorage.removeItem("id_token");
		  // Optionally redirect:
		  // window.location.href = "/"; // or your login page
		}
	  }
	}
  
	if (networkError) {
	  console.error("📡 Network error:", networkError);
	}
  });
  
  // ✅ Auth middleware to add token
  const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("id_token");
	return {
	  headers: {
		...headers,
		authorization: token ? `Bearer ${token}` : "",
	  },
	};
  });
  
  // ✅ Apollo Client Setup
  const client = new ApolloClient({
	link: from([errorLink, authLink, httpLink]),
	cache: new InMemoryCache(),
  });
  
  export default client;
  