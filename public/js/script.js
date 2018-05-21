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

const fetchPost = async (title, photoUrl) => {
  const url = '/api/v1/photos';

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ title, url }),
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
  console.log(id)
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
  const photoUrl = $('#url').val();

  event.preventDefault();
  clearInputs();
  fetchPost(title, url);
  renderPhotos();
}

const handleDelete = async (id) => {
  console.log('handle delete');
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
  console.log(photos)
  $('main').html('');
  $.each(photos, (index, photo) => {
    const newPhoto = $(`
      <article id="photo-${photo.id}">
        <h2 >${photo.title}</h2>
        <img src="${photo.url}" />
        <button class="delete" id="${photo.id}" onClick="handleDelete(${photo.id})">Delete</button>
      </article>
    `);
    $('main').append(newPhoto);
  });
};

