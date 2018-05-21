const onLoad = async () => {
  renderPhotos();
}

const renderPhotos = async () => {
  photos = await fetchPhotos();
  console.log(photos)
  $.each(photos, (index, photo) => {
    const newPhoto = $(`
      <article id="photo-${photo.id}">
        <h2 >${photo.title}</h2>
        <img src="${photo.url}" />
      </article>
    `);
    $('main').append(newPhoto);
  });
};

const fetchPhotos = async () => {
  const url = '/api/v1/photos';
  try {
    const response = await fetch(url);
    const photos = await response.json();
    return photos;
  } catch(error) {
    console.log('Error: ' + error.message);
  }
};