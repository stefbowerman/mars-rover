const API_KEY = 'nk4hqRD7ABgFJqZrtdbnJhv9BjAtgncgbjbUmS5U'

const imagesList = document.getElementById('images-list')
const popup = document.getElementById('popup')

document.getElementById('mast-camera').addEventListener('click', function() {
  fetchImagesAndRender('MAST')
})

document.getElementById('front-camera').addEventListener('click', function() {
  fetchImagesAndRender('FHAZ')
})

document.getElementById('chem-camera').addEventListener('click', function() {
  fetchImagesAndRender('CHEMCAM')
})

popup.addEventListener('click', function() {
  popup.style.display = 'none'
})

function showPopupWithInformation(photo) {
  popup.innerHTML = `
    <p>Rover Name: ${photo.rover.name}</p>
    <p>Camera: ${photo.camera.full_name}</p>
    <p>Date Taken: ${photo.earth_date}</p>
  `

  popup.style.display = 'block'
}

function fetchImagesAndRender(camera) {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=${camera}&page=1&api_key=${API_KEY}`

  imagesList.innerHTML = 'Fetching...'

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      imagesList.innerHTML = ''

      const photos = json.photos

      photos.forEach(function(photo) {
        const listItem = document.createElement('div')

        listItem.innerHTML = `
          <img src="${photo.img_src}" />
        `

        listItem.addEventListener('click', function() {
          showPopupWithInformation(photo)
        })

        imagesList.appendChild(listItem)
      })
    });
}
