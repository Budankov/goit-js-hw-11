import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayApi } from './js/api';
import { createMarkupElemetsGallery } from './js/createMarkupElemetsGallery';

const pixabayApi = new PixabayApi();
const gallery = new SimpleLightbox('.gallery a');

const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('.search-button');
const galleryListEl = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearchImages);

// function makeGalleryItem() {
//   const makeGalleryItem = fetchImages.map(createMarkupElemetsGallery).join('');

//   galleryListEl.insertAdjacentHTML('beforeend', makeGalleryItem);
// }

// function onSearchImages(e) {
//   e.preventDefault();

//   const { value } = e.target;
//   console.log(value);

//   if (value.trim() === '') {
//     Notiflix.Notify.info('Please enter.');
//   } else {
//     fetchImages(value.trim())
//       .then(makeGalleryItem)
//       .catch(error =>
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again'
//         )
//       );
//   }
// }

let galleryImages = [];

function renderGallery() {
  const galleryEl = galleryImages.map(createMarkupElemetsGallery);

  galleryListEl.innerHTML = '';
  galleryListEl.insertAdjacentHTML('beforeend', galleryEl.join(''));

  const gallery = new SimpleLightbox('.gallery a');
}

function onSearchImages(e) {
  e.preventDefault();

  const { value } = e.target.elements.searchQuery;

  fetch(
    `https://pixabay.com/api/?key=31850600-8bc33184832b82bc138f7cdcb&q=${value}`
  )
    .then(res => res.json())
    .then(({ hits }) => {
      galleryImages = hits;
      renderGallery();
    });
}
