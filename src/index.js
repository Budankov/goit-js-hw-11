import './css/styles.css';
import './js/back-to-top';
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

const callback = async function (entries) {
  const line = entries[0].isIntersecting;

  if (line) {
    pixabayApi.page += 1;
    const { data } = await pixabayApi.fetchPhoto();
    galleryImages = data.hits;
    renderGallery();
  }
};

const observer = new IntersectionObserver(callback, options);

function renderGallery() {
  const galleryEl = galleryImages.map(createMarkupElemetsGallery);
  galleryListEl.insertAdjacentHTML('beforeend', galleryEl.join(''));

  const gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
}

async function onSearchImages(e) {
  e.preventDefault();
  observer.unobserve(galleryEnd);
  galleryListEl.innerHTML = '';
  pixabayApi.page = 1;
  pixabayApi.searchQuery = e.currentTarget.elements.searchQuery.value;

  try {
    if (pixabayApi.searchQuery.trim() === '') {
      Notiflix.Notify.info('Enter what to look for!');
      return;
    }
    const { data } = await pixabayApi.fetchPhoto();
    galleryImages = data.hits;
    renderGallery();
    observer.observe(galleryEnd);

    if (data.hits.length <= 0) {
      observer.unobserve(galleryEnd);
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again'
      );
    }

    if (data.hits.length > 0) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    console.log(data.hits.length);
  } catch (error) {
    console.log(error.message);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
}
