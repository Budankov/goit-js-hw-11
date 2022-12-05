import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetchImages';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('.search-button');

searchForm.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const { value } = e.target;
  console.log(value);
}
