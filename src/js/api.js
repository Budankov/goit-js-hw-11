import axios from "axios";

const API_KEY = "53f2c47317a563cd2628c68ceb6a6673";
const URL = "https://api.themoviedb.org/3/trending/all/day?api_key=";

export class FetchAPI {
  constructor() {
    this.page = 1;
  }

  async fetchTrendingFilms() {
    return await axios.get(`${URL}${API_KEY}`);
  }
}
