import React, { useRef, useEffect, useState } from "react";
import "./TrendingCards.css";
import { fetchMovies } from "../../services/tmdb";

const TrendingCards = () => {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    async function loadTrending() {
      const data = await fetchMovies("/movie/popular?language=en-US&page=1");
      setTrendingData(data);
    }
    loadTrending();
  }, []);
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  };
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="trending-section">
      <div className="trending-wrapper">
        <button className="nav-btn left" onClick={scrollLeft}>
          &#10094;
        </button>
        <div className="trending-cards" ref={scrollRef} onWheel={handleWheel}>
          {trendingData.map((card, idx) => (
            <div key={card.id} className="trending-card-wrapper">
              <div className="card-number">
                <span className="stroke">{idx + 1}</span>
                <span className="fill">{idx + 1}</span>
              </div>
              <div className="trending-card">
                <img
                  src={`${IMG_BASE_URL}${card.poster_path}`}
                  alt={card.title}
                />
              </div>
            </div>
          ))}
        </div>
        <button className="nav-btn right" onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default TrendingCards;
