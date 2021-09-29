const client = '563492ad6f91700001000001aea7b8da8c8846e0a4ae821bc72bf91d';

async function getImage() {
    const headers = new Headers({
        'Authorization': client,
    })


    const response = await fetch('https://api.pexels.com/v1/search?query=london&per_page=2', {
        method: 'GET',
        headers,
    })
    const data = await response.json();
    const photo = data.photos;
    renderImage(photo);
}

async function getVideo() {
    const headers = new Headers({
        'Authorization': client,
    })

    const response = await fetch('https://api.pexels.com/videos/search?query=nature&per_page=7', {
        method: 'GET',
        headers,
    })
    const data = await response.json();
    const videoFile = data.videos[0].video_files[0].link;
    

}

function createElements(element, classElement) {
    const newElement = document.createElement(element);
    newElement.className = classElement;
    return newElement;
}

function renderImage (photos){
    const photoParent = document.querySelector('.card-group');
    photos.forEach((photo) => {
        const divCard = createElements('div', 'card');
        const newPhoto = createElements('img', 'card-img-top');
        const cardBody = createElements('div', 'card-body');
        const text = createElements('p', 'card-title');

        newPhoto.src = photo.src.small;
        text.innerText = photo.photographer;

        photoParent.appendChild(divCard);
        divCard.appendChild(newPhoto);
        divCard.appendChild(cardBody);
        cardBody.appendChild(text);
    })
}

window.onload = () => {
    getImage()
    getVideo()
}