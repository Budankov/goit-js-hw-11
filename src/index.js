import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayApi } from './js/api';
import { createMarkupElemetsGallery } from './js/renderGallery';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const pixabayApi = new PixabayApi();
const gallery = new SimpleLightbox('.gallery a');

const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('.search-button');
const galleryListEl = document.querySelector('.gallery');

searchForm.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const { value } = e.target;
  console.log(value);

  if (value.trim() === '') {
    Notiflix.Notify.info('Please enter.');
  } else {
    fetchImages(value.trim())
      .then(makeGalleryItem)
      .catch(error =>
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again'
        )
      );
  }
}

function makeGalleryItem() {
  const makeGalleryItem = fetchImages.map(createMarkupElemetsGallery).join('');

  galleryListEl.insertAdjacentHTML('beforeend', makeGalleryItem);
}
