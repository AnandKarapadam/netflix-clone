import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner from "../../assets/hero_banner.jpg";
import hero_title from "../../assets/hero_title.png";
import play_icon from "../../assets/play_icon.png";
import info_icon from "../../assets/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  let protecter = "80dqOwAOhbo";
  let navigate = useNavigate()
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-mobile-links">
          <span onClick={() => navigate("/tv-shows")}>TV Shows</span>
          <span onClick={() => navigate("/movies")}>Movies</span>
          <span onClick={() => navigate("/my-list")}>My List</span>
        </div>
        <div className="hero-caption">
          <img src={hero_title} className="caption-img" alt="" />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save a city from a immortal
            enemy.
          </p>
          <div className="hero-btns">
            <Link to={`/player/${protecter}`}>
              <button className="btn">
                <img src={play_icon} alt="" />
                Play
              </button>
            </Link>

            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movie"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Pics for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
