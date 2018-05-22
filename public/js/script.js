// on document load

const onLoad = async () => {
  renderPhotos();
}


// fetch requests

const fetchPhotos = async () => {
  const url = '/api/v1/photos';
  try {
    const response = await fetch(url);
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.log('Error: ' + error.message);
  }
};

const fetchPost = async (title, image) => {
  const url = '/api/v1/photos';
  
  console.log(title, image)

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ title, url: image }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 201) {
          alert('Photo added successfully')
        } else {
          alert('Error adding photo.')
        }
      })
  } catch (error) {
    console.log('Error: ' + error.message)
  }
}

fetchDelete = async (id) => {
  const url = `/api/v1/photos/${id}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.status === 200) {
          alert('Photo deleted successfully')
        } else {
          alert('Error deleting photo.')
        }
      })
  } catch (error) {
    console.log('Error: ' + error.message)
  }
}


// click handlers

const handleSubmit = () => {
  const title = $('#title').val();
  const image = $('#url').val();

  event.preventDefault();
  clearInputs();
  fetchPost(title, image);
  renderPhotos();
}

const handleDelete = async (id) => {
  await fetchDelete(id);
  renderPhotos();
}  

$('#submit').click(handleSubmit);


// other functions

const clearInputs = () => {
  $('#title').val('');
  $('#url').val('')
}  

const renderPhotos = async () => {
  photos = await fetchPhotos();
  $('main').html('');
  $.each(photos, (index, photo) => {
    const newPhoto = $(`
      <article id="photo-${photo.id}">
        <h2 >${photo.title}</h2>
        <img src="${photo.url}" />
        <input type="image" src="../css/garbage.svg" class="delete" id="${photo.id}" onClick="handleDelete(${photo.id})" />
      </article>
    `);
    $('main').append(newPhoto);
  });
};

