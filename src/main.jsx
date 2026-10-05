import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@asgardeo/auth-react";
import "./index.css";
import App from "./App.jsx";

const asgardeoConfig = {
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "fEm26HuNojXuSPAqcAGxYIBwGUoa",
  baseUrl: "https://api.asgardeo.io/t/securelab",
  scope: ["openid", "profile","email","roles"],
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider config={asgardeoConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);


