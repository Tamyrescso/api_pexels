const client = '563492ad6f91700001000001aea7b8da8c8846e0a4ae821bc72bf91d';
const photoBtn = document.querySelector('.photo-btn');
const videoBtn = document.querySelector('.video-btn');
const query = document.querySelector('.query');
const queryBtn = document.querySelector('.query-btn');
const fileCard = document.querySelector('.right');

async function getImage() {
    const headers = new Headers({
        'Authorization': client,
    })


    const response = await fetch(`https://api.pexels.com/v1/search?query=${query.value}&per_page=12`, {
        method: 'GET',
        headers,
    })
    const data = await response.json();
    const photo = data.photos;
    renderImage(photo);
}

function showVideo(video) {
    const videoZoom = createElements('iframe', 'rounded', 'videoSelected');

    fileCard.innerHTML = '';
    videoZoom.src = video;

    fileCard.appendChild(videoZoom);
}

async function getVideoById(event) {
    const headers = new Headers({
        'Authorization': client,
    })
    const element = event.target
    const response = await fetch(`https://api.pexels.com/videos/videos/${element.classList[1]}`, {
        method: 'GET',
        headers,
    })
    const data = await response.json();
    const video = data.video_files[0].link;
    showVideo(video);
}

function renderVideo(videos) {
    const videoParent = document.querySelector('.grid');
    videos.forEach((video) => {
        const cols = createElements('div', 'col', video.id);
        const divCard = createElements('div', 'card', video.id);
        const newVideo = createElements('iframe', 'card-video-top', video.id);
        const cardBody = createElements('div', 'card-body', video.id);
        const text = createElements('p', 'card-text', video.id);

        newVideo.src = video.video_files[0].link;
        text.innerText = video.user.name;

        videoParent.appendChild(cols);
        cols.appendChild(divCard);
        divCard.appendChild(newVideo);
        divCard.appendChild(cardBody);
        cardBody.appendChild(text);

        divCard.addEventListener('click', getVideoById);
    })
}

async function getVideo() {
    const headers = new Headers({
        'Authorization': client,
    })

    const response = await fetch(`https://api.pexels.com/videos/search?query=${query.value}&per_page=8`, {
        method: 'GET',
        headers,
    })
    const data = await response.json();
    const videos = data.videos;
    console.log(videos);
    renderVideo(videos);
}

function showImage(image) {
    const imageZoom = createElements('img', 'rounded', 'imageSelected');

    fileCard.innerHTML = '';
    imageZoom.src = image;

    fileCard.appendChild(imageZoom);
}

async function getImageById(event) {
    const headers = new Headers({
        'Authorization': client,
    })
    const element = event.target
    const response = await fetch(`https://api.pexels.com/v1/photos/${element.classList[1]}`, {
        method: 'GET',
        headers,
    })
    const data = await response.json();
    const photo = data.src.large;
    showImage(photo);
}

function createElements(element, classElement, classId) {
    const newElement = document.createElement(element);
    newElement.classList.add(classElement);
    newElement.classList.add(classId);
    return newElement;
}

function renderImage (photos){
    const photoParent = document.querySelector('.grid');
    photos.forEach((photo) => {
        const cols = createElements('div', 'col', photo.id);
        const divCard = createElements('div', 'card', photo.id);
        const newPhoto = createElements('img', 'card-img-top', photo.id);
        const cardBody = createElements('div', 'card-body', photo.id);
        const text = createElements('p', 'card-text', photo.id);

        newPhoto.src = photo.src.tiny;
        text.innerText = photo.photographer;

        photoParent.appendChild(cols);
        cols.appendChild(divCard);
        divCard.appendChild(newPhoto);
        divCard.appendChild(cardBody);
        cardBody.appendChild(text);

        divCard.addEventListener('click', getImageById);
    })
}

function addSelected(event){
    const select = document.querySelector('.selected');
    if (!select){
        event.target.classList.add('selected');
    } else {
        select.classList.remove('selected');
        event.target.classList.add('selected');
    }
}

function chooseType() {
    const select = document.querySelector('.selected');
    const cards = document.querySelector('.grid');
    cards.innerHTML = '';
    if (!select){
        alert('Selecione o tipo de mídia');
    } else if (select.classList.contains('photo-btn')){
        return getImage();
    } else {
        return getVideo();
    }
}

queryBtn.addEventListener('click',chooseType);
photoBtn.addEventListener('click', addSelected);
videoBtn.addEventListener('click', addSelected);
