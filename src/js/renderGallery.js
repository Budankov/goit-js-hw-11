export const createMarkupElemetsGallery = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) =>
  `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
    <img
      class="gallery__image"
      src="${webformatURL}"
      alt="${tags}"
    />
  </a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>`;

export const makeGalleryItem = galleryItems
  .map(createMarkupElemetsGallery)
  .join('');

galleryListEl.insertAdjacentHTML('beforeend', makeGalleryItem);

// Usage SimpleLightbox
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
