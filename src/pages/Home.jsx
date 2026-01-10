import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import jsPDF from "jspdf";

const YT_API_KEY = "AIzaSyCp3602etOBzx84D7kK-MuYW2JPZ_d5YV0";/* 🔥 Trending Netflix-style posters (REAL MOVIES) */
const trending = [
  {
    id: 1,
    img: "https://i.pinimg.com/736x/29/bd/72/29bd7256f7c41ffca5487b7d45b411de.jpg",
  },
  {
    id: 2,
    img: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
  },
  {
    id: 3,
    img: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
  },
  {
    id: 4,
    img: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
  },
  {
    id: 5,
    img: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
  },
  {
    id: 6,
  img: "https://i.pinimg.com/736x/1a/85/fc/1a85fc08c07154c0e942e771a1d758c6.jpg"
  },
  {
    id: 7,
    img: "https://i.pinimg.com/736x/53/ed/d3/53edd39303ddae10c72993578dcc2420.jpg"
   },
  {
    id: 8,
    img: "https://i.pinimg.com/1200x/07/2f/9a/072f9ab648cee70ac7cef7c0c83bcdf0.jpg"
  },
];

const faqs = [
  "What is Streamio?",
  "How much does Streamio cost?",
  "Where can I watch?",
  "How do I cancel?",
  "What can I watch on Streamio?",
  "Is Streamio good for kids?",
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [trailerError, setTrailerError] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  /* 🔍 Fetch TV Shows */
  useEffect(() => {
    if (!query) {
      setShows([]);
      return;
    }

    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then((res) => res.json())
      .then((data) => setShows(data))
      .catch(() => setShows([]));
  }, [query]);

  /* 🎬 Fetch YouTube Trailer */
  const fetchTrailer = async (title) => {
    setHasClicked(true);
    setTrailerError(false);
    setVideoId("");

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
          `${title} official trailer`
        )}&key=${YT_API_KEY}`
      );

      const data = await res.json();

      if (data.items && data.items.length > 0) {
        setVideoId(data.items[0].id.videoId);
      } else {
        setTrailerError(true);
      }
    } catch {
      setTrailerError(true);
    }
  };

  /* 📘 Download E-Book */
  const downloadEbook = (show) => {
    const doc = new jsPDF();
    const story =
      show.summary?.replace(/<[^>]*>/g, "") ||
      "Story details not available.";

    doc.setFontSize(20);
    doc.text(show.name, 10, 20);

    doc.setFontSize(12);
    doc.text(`Language: ${show.language || "N/A"}`, 10, 40);
    doc.text(`Genres: ${show.genres?.join(", ") || "N/A"}`, 10, 50);
    doc.text(`Status: ${show.status || "N/A"}`, 10, 60);
    doc.text("Story Overview:", 10, 80);
    doc.text(story, 10, 90, { maxWidth: 180 });

    doc.save(`${show.name}-ebook.pdf`);
  };

  return (
    <div className="home-page">
      <Navbar setQuery={setQuery} />

      {/* 🎥 HERO */}
      {!query && (
        <section className="hero-section">
          <div className="hero-overlay">
            <h1>Unlimited movies, TV shows and more</h1>
            <p>Watch anywhere. Cancel anytime.</p>
          </div>
        </section>
      )}

      {/* ▶ TRAILER */}
      {videoId && (
        <div className="trailer-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Trailer"
            className="trailer-iframe"
            allowFullScreen
          />
        </div>
      )}

      {hasClicked && trailerError && (
        <p className="no-trailer">Trailer not available</p>
      )}

      {/* 🔍 SEARCH RESULTS */}
      {query && (
        <div className="movie-list">
          {shows.map((item, i) => (
            <div className="movie-card" key={i}>
              <img
                src={
                  item.show.image?.medium ||
                  "https://via.placeholder.com/210x295"
                }
                alt={item.show.name}
                onClick={() => fetchTrailer(item.show.name)}
              />
              <p>{item.show.name}</p>
              <button
                className="ebook-btn"
                onClick={() => downloadEbook(item.show)}
              >
                📘 Download E-Book
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 NETFLIX UI */}
      {!query && (
        <>
         <section className="trending">
  <h2>Trending Now</h2>

  {/* RIGHT ARROW */}
  <div
    className="scroll-arrow right"
    onClick={() => {
      document.querySelector(".trending-row").scrollBy({
        left: 600,
        behavior: "smooth",
      });
    }}
  >
    ❯
  </div>

  <div className="trending-row">
    {trending.map((item, index) => (
      <div className="trending-item" key={item.id}>
        <span className="trending-rank">{index + 1}</span>

        <img
          src={item.img}
          alt={`Trending ${index + 1}`}
          className="trending-img"
        />
      </div>
    ))}
  </div>
</section>



          {/* REASONS */}
          <section className="reasons">
            <h2>More reasons to join</h2>
            <div className="reason-grid">
              <div className="reason-card">Enjoy on your TV</div>
              <div className="reason-card">Download to watch offline</div>
              <div className="reason-card">Watch everywhere</div>
              <div className="reason-card">Kids profiles</div>
            </div>
          </section>

          {/* FAQ */}
          <section className="faq">
            <h2>Frequently Asked Questions</h2>
            {faqs.map((q, i) => (
              <div className="faq-item" key={i}>
                <span>{q}</span>
                <span className="plus">+</span>
              </div>
            ))}
          </section>
          
          {/* MEMBERSHIP */}
<section className="membership-section">
  <h2 className="membership-title">Streamio Membership</h2>
  <p className="membership-subtitle">
    Choose the perfect subscription plan for your streaming needs
  </p>

  <div className="membership-cards">
    {/* STANDARD */}
    <div className="membership-card">
      <div className="plan-header">
        <span className="plan-icon">👤</span>
        <h3>Standard</h3>
      </div>

      <div className="price">
        $14.99 <span>/ month</span>
      </div>

      <button className="select-btn outline">Select this plan</button>

      <ul className="plan-features">
        <li>✔ Stream movies in high-definition (HD) quality</li>
        <li>✔ Access to our vast library of movies and TV shows</li>
        <li>✔ Watch movies on up to two devices simultaneously</li>
        <li>✔ Cancel anytime</li>
        <li>✔ Ads-free</li>
      </ul>
    </div>

    {/* PREMIUM */}
    <div className="membership-card premium">
      <div className="plan-header">
        <span className="plan-icon">👑</span>
        <h3>Premium</h3>
      </div>

      <div className="price red">
        $19.99 <span>/ month</span>
      </div>

      <button className="select-btn filled">Select this plan</button>

      <ul className="plan-features">
        <li>✔ Stream movies in 4K Ultra HD quality</li>
        <li>✔ Exclusive access to premium content and early releases</li>
        <li>✔ Watch movies on up to four devices simultaneously</li>
        <li>✔ Cancel anytime</li>
        <li>✔ Ads-free</li>
      </ul>
    </div>
  </div>

  <p className="trial-text">
    Get a 7-day free trial on any plan! Cancel anytime during the trial period
    with no charges.
    <br />
    Get ready for an incredible movie streaming journey with PlayCine.
    <span> Sign up</span> today and let the entertainment begin!
  </p>
</section>


          {/* CTA */}
          <section className="cta">
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="cta-box">
              <input type="email" placeholder="Email address" />
              <button>Get Started →</button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
