const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

const BASE_URL = 'https://api.themoviedb.org/3';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

export async function fetchMovies(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`,options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log("TMDB Fetch Error:",error);
        return [];
    }
}

