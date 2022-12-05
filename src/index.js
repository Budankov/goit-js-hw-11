import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetchImages';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
