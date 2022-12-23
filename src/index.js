import "./css/styles.css";
import { FetchAPI } from "./js/api";
import { createMarkupElemetsGallery } from "./js/createMarkupElemetsGallery";

const searchForm = document.querySelector("#search-form");
const galleryList = document.querySelector(".gallery");

const fetchApi = new FetchAPI();

searchForm.addEventListener("submit", trendingFilms);

let galleryEl = [];

async function trendingFilms(e) {
  e.preventDefault();
  galleryList.innerHTML = "";
  fetchApi.page = 1;
  const { data } = await fetchApi.fetchTrendingFilms();
  galleryEl = data.results;
  console.log(galleryEl);
  renderGallery();
}

function renderGallery() {
  const galleryElements = galleryEl.map(createMarkupElemetsGallery);
  galleryList.insertAdjacentHTML("beforeend", galleryElements.join(""));
}
