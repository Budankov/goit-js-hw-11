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
// .catch(error =>
//   Notiflix.Notify.failure(
//     'Sorry, there are no images matching your search query. Please try again'
//   )
// );
//   }
// }

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
    const {
      data: { hits },
    } = await pixabayApi.fetchPhoto();
    console.log(hits);
    galleryImages = hits;
    renderGallery();
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
}
