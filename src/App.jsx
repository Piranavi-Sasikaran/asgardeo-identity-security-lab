import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";

function Home() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <div>
      <h1>Asgardeo Identity Security Lab</h1>

      {state.isAuthenticated ? (
        <>
          <p>
            Welcome, <strong>{state.username}</strong>
          </p>

          <Link to="/dashboard">Open Protected Dashboard</Link>

          <br />
          <br />

          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <p>You are not authenticated.</p>
          <button onClick={() => signIn()}>Login with Asgardeo</button>
        </>
      )}
    </div>
  );
}

function Dashboard() {
  const { state, getBasicUserInfo } = useAuthContext();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (state.isAuthenticated) {
      getBasicUserInfo()
        .then((info) => {
          setUserInfo(info);
        })
        .catch((error) => {
          console.error("Failed to retrieve user information:", error);
        });
    }
  }, [state.isAuthenticated, getBasicUserInfo]);

  return (
    <div>
      <h1>Security Dashboard</h1>

      <h2>🔒 Protected Resource</h2>
      <p>Only authenticated users can access this dashboard.</p>

      <h3>Authenticated User</h3>

      <p>
        Username: <strong>{state.username || "Not available"}</strong>
      </p>

      <p>
        Authentication Status:{" "}
        <strong>
          {state.isAuthenticated ? "Authenticated" : "Not authenticated"}
        </strong>
      </p>

      <h3>Identity Claims</h3>

      {userInfo ? (
        <>
          <p>
            Username: <strong>{userInfo.username || "Not available"}</strong>
          </p>

          <p>
            Given Name: <strong>{userInfo.givenName || "Not available"}</strong>
          </p>

          <p>
            Email: <strong>{userInfo.email || "Not available"}</strong>
          </p>
          <p>
            Roles:{" "}
            <strong>
              {userInfo.roles
                ? Array.isArray(userInfo.roles)
                  ? userInfo.roles.join(", ")
                  : userInfo.roles
                : "Not available"}
            </strong>
          </p>
        </>
      ) : (
        <p>Loading user information...</p>
      )}

      <p>
        <Link to="/analyst">Open Security Analyst Console</Link>
      </p>

      <Link to="/">Back to Home</Link>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { state } = useAuthContext();

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AnalystPage() {
  return (
    <div>
      <h1>Security Analyst Console</h1>
      <h2>🛡️ Authorized Access</h2>

      <p>You have the Security Analyst role.</p>
      <p>This resource is restricted to authorized security analysts.</p>

      <Link to="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

function RoleProtectedRoute({ children }) {
  const { state, getBasicUserInfo } = useAuthContext();
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    if (!state.isAuthenticated) {
      setAuthorized(false);
      return;
    }

    getBasicUserInfo()
      .then((info) => {
        const roles = Array.isArray(info.roles)
          ? info.roles
          : info.roles
            ? [info.roles]
            : [];

        setAuthorized(roles.includes("Security Analyst"));
      })
      .catch(() => {
        setAuthorized(false);
      });
  }, [state.isAuthenticated, getBasicUserInfo]);

  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (authorized === null) {
    return <p>Checking authorization...</p>;
  }

  if (!authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analyst"
          element={
            <RoleProtectedRoute>
              <AnalystPage />
            </RoleProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;