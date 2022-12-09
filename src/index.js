import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayApi } from './js/api';
import { createMarkupElemetsGallery } from './js/createMarkupElemetsGallery';

const pixabayApi = new PixabayApi();

const searchForm = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const galleryEnd = document.querySelector('.gallary-end');

searchForm.addEventListener('submit', onSearchImages);

let galleryImages = [];

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const callback = function (entries) {
  const line = entries[0].isIntersecting;
  console.log(line);

  if (line) {
    pixabayApi.page += 1;
    renderGallery();
  }
};

const observer = new IntersectionObserver(callback, options);

observer.observe(galleryEnd);

// const observer = new IntersectionObserver(async enteries => {
//   if (enteries[0].isIntersecting) {
//     pixabayApi.page += 1;
//     renderGallery();
//   }
// }, observerOptions);

function renderGallery() {
  const galleryEl = galleryImages.map(createMarkupElemetsGallery);

  // galleryListEl.innerHTML = '';
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
    galleryListEl.innerHTML = '';
    galleryImages = data.hits;
    renderGallery();
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
}
