// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Suspense } from "react";

import Home from "./pages/Home";
import Hero from "./pages/Hero"; // 👈 Landing page
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";


import { AuthProvider } from "./context/AuthContext";
import useAuth from "./hooks/useAuth";

/* Protected Route */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ color: "white", textAlign: "center" }}>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

/* Layout to control Navbar */
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<Hero />} />

              {/* Public Pages */}
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Page */}
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
