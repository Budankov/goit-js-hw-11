export function createMarkupElemetsGallery({
  title,
  poster_path,
  release_date = [],
}) {
  return `<div class="photo-card">
  <a class="gallery__item">
    <img
      class="gallery__image"
      src="https://image.tmdb.org/t/p/w1280${poster_path}"
      alt="${title}"
      width = '395';
      height = '574';
    />
  </a>

  <div class="info">
    <p class="info-item">${title}</p>
    <div class="info-other">
      <p class="info-item">Жанр: </b>хер знає</p>
      <p class="info-item">${release_date}</p>
    </div>
  </div>
</div>`;
}
