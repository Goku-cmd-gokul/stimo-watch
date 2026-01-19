// src/App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense } from "react";

import Home from "./pages/Home";
import Hero from "./pages/Hero";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

/* ================= Protected Route ================= */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

/* ================= Layout ================= */
const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Navbar on landing & auth pages
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main
        style={{
          paddingTop: hideNavbar ? "0" : "80px",
          minHeight: "100vh",
          background: "#000",
        }}
      >
        {children}
      </main>
    </>
  );
};

/* ================= App ================= */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Suspense
            fallback={
              <div style={{ color: "white", textAlign: "center" }}>
                Loading...
              </div>
            }
          >
            <Routes>
              {/* Landing */}
              <Route path="/" element={<Hero />} />

              {/* Public Pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />

              {/* Protected */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <h1 style={{ color: "white", textAlign: "center" }}>
                      Dashboard
                    </h1>
                  </PrivateRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
