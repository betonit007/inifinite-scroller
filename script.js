const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = []

let count = 30;
const apiKey = "azz9zOBJxLEdH9XQriIbPBLq7sj03PHGRS5TOEYC1ww"

const baseURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`


function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready=', ready)
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
    imagesLoaded=0;
    totalImages= photosArray.length
    console.log('total Images', totalImages)
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        console.log(item)
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item)  
    })
}

//Get Photos from unsplash API
async function getPhotos() {
    try {
        const response = await (await fetch(baseURL)).json()
        console.log(response)
        photosArray = response
        displayPhotos()
    } catch (err) {
        console.log(err)
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    console.log(document.body.offsetHeight)
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) { // offsetHeight is size of all element within the targeted element.
      ready = false;
      getPhotos()
     
    }
})


getPhotos()

