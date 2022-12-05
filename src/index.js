import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/fetchImages';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('.search-button');
const galleryListEl = document.querySelector('.gallery');

searchForm.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const { value } = e.target;
  console.log(value);

  //   if (value.trim() === '') {
  //     clg()
  //   } else {
  //     fetchCountries(value.trim())
  //       .then()
  //       .catch(error =>
  //         Notiflix.Notify.failure(
  //           'Sorry, there are no images matching your search query. Please try again'
  //         )
  //       );
  //   }
}
