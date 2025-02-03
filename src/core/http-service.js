import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const key = import.meta.env.VITE_TMDB_KEY;

const endpoints = {
  popular: `${BASE_URL}movie/popular?api_key=${key}&language=en-US`,
  topRated: `${BASE_URL}movie/top_rated?api_key=${key}`,
  now_playing: `${BASE_URL}movie/now_playing?api_key=${key}&language=en-US`,
  trending: `${BASE_URL}trending/movie/week?api_key=${key}&language=en-US`,
  comedy: `${BASE_URL}search/movie?api_key=${key}&language=en-US&query=comedy&page=1&include_adult=false`,
  upcoming: `${BASE_URL}movie/upcoming?api_key=${key}&language=en-US`,
};

export function createImageUrl(fileName , size) {
  return `https://image.tmdb.org/t/p/${size}/${fileName}`;
}

export function addCommasToNumber(number){
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const httpService = axios.create({
  baseURL: BASE_URL,
});

export default endpoints;
