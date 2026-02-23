import React, { useRef, useEffect, useState } from "react";
import "./TitleCards.css";
import { fetchMovies } from "../../services/tmdb";
import {Link} from 'react-router-dom';

function TitleCards({title,category}) {
  const [apiData,setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    async function loadMovies(){
      const data = await fetchMovies(
        `/movie/${category?category:"now_playing"}?language=en-US&page=1`
      );
      setApiData(data);
    }
    loadMovies();
    const current = cardsRef.current;
    if(!current)return;
    current.addEventListener("wheel", handleWheel);
    return ()=>{
      current.removeEventListener('wheel',handleWheel);
    }
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/movie/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.poster_path} alt="" />
              
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default TitleCards;
