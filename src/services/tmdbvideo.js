import React from "react";
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${API_KEY}`
    },
  };
export async function fetchTrailer(id){
    try {
        const response = await fetch(`${BASE_URL}${id}/videos?language=en-US`,options);
        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.log('TMDB Video Error:',error);
        return {};
    }
}