import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import "./MyList.css";
import { db } from "../../firebase";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/Navbar/Navbar";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import Footer from "../../components/Footer/Footer";

function MyList() {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;

    const fetchMyList = async () => {
      setLoading(true);
      const q = query(
        collection(db, "users", user.uid, "myList"),
        orderBy("addedAt", "desc"),
      );
      const querySnapshot = await getDocs(q);

      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMovies(list);
      setLoading(false);
    };
    fetchMyList();
  }, [user]);

  const handleRemove = async (movieId) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "myList", movieId.toString()));
      setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="mylist-spinner">
          <img src={netflix_spinner} alt="Loading..." />
        </div>
      ) : (
        <div className="mylist-container">
          <h1 className="mylist-head">My List</h1>

          {loading ? (
            <div className="mylist-spinner">
              <img src={netflix_spinner} alt="Loading..." />
            </div>
          ) : movies.length === 0 ? (
            <p>No movies added yet.</p>
          ) : (
            <div className="mylist-grid">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p id="movie-title">{movie.title}</p>
                  <button
                    id="remove-button"
                    onClick={() => handleRemove(movie.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Footer/>
    </div>
  );
}

export default MyList;
