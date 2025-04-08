import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./pages/Wireframe.css";
import App from "./App";
import { ApolloProvider } from "@apollo/client"; 
import client from "./utils/apolloClient";      

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
