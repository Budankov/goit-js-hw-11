export function createMarkupElemetsGallery({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}">
    <img
      class="gallery__image"
      src="${webformatURL}"
      alt="${tags}"
        width="400"
      height="250"
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
}

// export function createMarkupElemetsGallery({
//   webformatURL,
//   largeImageURL,
//   tags,
//   likes,
//   views,
//   comments,
//   downloads,
// }) {
//   return `
//   <a class="gallery__item" href="${largeImageURL}">
//     <img
//       class="gallery__image"
//       src="${webformatURL}"
//       alt="${tags}"
//       width="400"
//       height="250"
//     />
//   </a>`;
// }
