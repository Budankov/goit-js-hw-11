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
  rootMargin: '0px',
  threshold: 1.0,
};

const callback = function (entries) {
  const line = entries[0].isIntersecting;
  // console.log(line);

  if (line) {
    pixabayApi.page += 1;
    console.log(pixabayApi.page);
    renderGallery();
  }
};

const observer = new IntersectionObserver(callback, options);

function renderGallery() {
  const galleryEl = galleryImages.map(createMarkupElemetsGallery);

  galleryListEl.insertAdjacentHTML('beforeend', galleryEl.join(''));
  const gallery = new SimpleLightbox('.gallery a');
}

async function onSearchImages(e) {
  e.preventDefault();
  galleryListEl.innerHTML = '';
  pixabayApi.page = 1;
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
    observer.observe(galleryEnd);
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
}
