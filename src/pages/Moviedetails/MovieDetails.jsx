import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import play_icon from "../../assets/play_icon.png";
import { useParams } from "react-router-dom";
import { fetchMovies } from "../../services/tmdb";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import "./MovieDetails.css";
import { Link } from "react-router-dom";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/authContext";

function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const { user } = useAuth();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToList = async () => {
    if (!user) return;

    const movieRef = doc(db, "users", user.uid, "myList", movie.id.toString());
    if (isAdded) {
      await deleteDoc(movieRef);
      setIsAdded(false);
    } else {
      await setDoc(movieRef, {
        id: movie.id,
        title: movie.original_title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        addedAt: new Date(),
      });
      setIsAdded(true);
    }
  };
  useEffect(() => {
    if (!movie || !user) return;

    const checkIfAdded = async () => {
      const movieRef = doc(
        db,
        "users",
        user.uid,
        "myList",
        movie.id.toString(),
      );
      const snapshot = await getDoc(movieRef);

      setIsAdded(snapshot.exists());
    };
    checkIfAdded();
  }, [movie, user]);

  useEffect(() => {
    async function loadMovie() {
      const categories = ["top_rated", "popular", "upcoming", "now_playing"];

      for (let c of categories) {
        let movies = await fetchMovies(`/movie/${c}`);
        const found = movies.find((m) => m.id === Number(id));
        if (found) {
          setMovie(found);
          break;
        }
      }
    }
    loadMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="movie-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="movie-hero">
        <img
          src={back_arrow_icon}
          onClick={() => navigate(-1)}
          className="back-arrow"
          alt=""
        />
        <img
          className="movie-banner-img"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt=""
        />
        <div className="movie-hero-caption">
          <h1>{movie.original_title}</h1>
          <div className="movie-meta">
            <span className="rating">
              ⭐ {movie.vote_average?.toFixed(1)} / 10
            </span>
            <span className="votes">({movie.vote_count} votes)</span>
          </div>

          <p className="movie-description">{movie.overview}</p>
          

          <div className="movie-hero-btns">
            <Link to={`/player/${movie.id}`}>
              <button className="btn">
                <img src={play_icon} alt="" />
                Play
              </button>
            </Link>
            <button onClick={handleAddToList} className="btn dark-btn">
              {isAdded ? "-Remove From List" : "+ Add To List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
