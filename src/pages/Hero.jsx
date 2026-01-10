import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      {/* Navbar */}
      <nav className="hero-navbar">
        <div className="logo" onClick={() => navigate("/")}>
          PLAYCINE
        </div>

        <div className="nav-actions">
          <button className="signin-btn" onClick={() => navigate("/login")}>
            Sign in
          </button>
          <button className="join-btn" onClick={() => navigate("/signup")}>
            Join PlayCine
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>
          Igniting Your Passion for Movies,
          <br />
          Unleashing Wonder!
        </h1>

        <p>
          Welcome to PLAYCINE, where the silver screen comes alive,
          offering a captivating web app experience that fuels your
          love for movies.
        </p>

        <button className="discover-btn" onClick={() => navigate("/home")}>
          Discover PLAYCINE
        </button>
      </div>

      {/* 🎬 Movie Posters */}
      <div className="poster-row">
        <img src="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" alt="The Dark Knight" />
        <img src="https://i.pinimg.com/1200x/86/d3/37/86d3373e6d7784eeec45c7c9d2794aff.jpg"/>
        <img src="https://image.tmdb.org/t/p/w500/rTh4K5uw9HypmpGslcKd4QfHl93.jpg" alt="Avengers" />
        <img src="https://i.pinimg.com/1200x/47/1b/cd/471bcd0d2ebb45c3c5a0ba03e59b07e0.jpg" alt="Interstellar" />
        <img src="https://i.pinimg.com/736x/7c/8f/e5/7c8fe5b2dace150805e7da2f97f990c8.jpg"/>
          </div>
    </div>
  );
};

export default Hero;
