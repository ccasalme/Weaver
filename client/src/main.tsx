import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// ✅ Apollo Client Setup
const client = new ApolloClient({
  uri: "/graphql", // Ensure server URI is correct
  cache: new InMemoryCache(),
});

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    {/* Wrap App with ApolloProvider */}
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
