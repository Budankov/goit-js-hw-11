const filterResponse = '?fields=name,capital,population,flags,languages';

export const fetchImages = searchQuery => {
  return fetch(`${URL}${searchQuery}${filterResponse}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
