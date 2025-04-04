import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client"; // ✅ This line!
import client from "./utils/apolloClient";        // ✅ Your exported Apollo client

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
