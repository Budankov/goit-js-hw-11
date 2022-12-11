import axios from 'axios';

const API_KEY = '31850600-8bc33184832b82bc138f7cdcb';
const URL = 'https://pixabay.com/api/?key=';

export class PixabayApi {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.per_page = 40;
  }

  async fetchPhoto() {
    const options = {
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.per_page,
    };

    return await axios.get(`${URL}`, { params: options });
  }
}

export async function fetchImage(query, page, per_page) {
  const { data } = await axios.get(
    `${BASE_URL}?key=${KEY_SUCSESS}&q=${query}&page=${page}&per_page=${per_page}`
  );
  return data;
}
