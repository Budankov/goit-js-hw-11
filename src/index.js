import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayApi } from './js/api';
import { createMarkupElemetsGallery } from './js/createMarkupElemetsGallery';

const pixabayApi = new PixabayApi();

const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('.search-button');
const galleryListEl = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearchImages);

let galleryImages = [];

function renderGallery() {
  const galleryEl = galleryImages.map(createMarkupElemetsGallery);

  galleryListEl.innerHTML = '';
  galleryListEl.insertAdjacentHTML('beforeend', galleryEl.join(''));
  const gallery = new SimpleLightbox('.gallery a');
}

async function onSearchImages(e) {
  e.preventDefault();
  pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;

  try {
    if (pixabayApi.searchQuery.trim() === '') {
      Notiflix.Notify.info('Enter what to look for!');
      return;
    }

    const { data } = await pixabayApi.fetchPhoto();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    galleryImages = data.hits;
    renderGallery();
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
}
