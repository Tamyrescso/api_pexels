const client = '563492ad6f91700001000001aea7b8da8c8846e0a4ae821bc72bf91d';
const photoBtn = document.querySelector('.photo-btn');
const videoBtn = document.querySelector('.video-btn');
const query = document.querySelector('.query');
const queryBtn = document.querySelector('.query-btn');

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

function renderVideo(videos) {
    const videoParent = document.querySelector('.grid');
    videos.forEach((video) => {
        const cols = createElements('div', 'col');
        const divCard = createElements('div', 'card');
        const newVideo = createElements('iframe', 'card-video-top');
        const cardBody = createElements('div', 'card-body');
        const text = createElements('p', 'card-text');

        newVideo.src = video.video_files[0].link;
        text.innerText = video.user.name;

        videoParent.appendChild(cols);
        cols.appendChild(divCard);
        divCard.appendChild(newVideo);
        divCard.appendChild(cardBody);
        cardBody.appendChild(text);
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
    renderVideo(videos);
}

function createElements(element, classElement) {
    const newElement = document.createElement(element);
    newElement.className = classElement;
    return newElement;
}

function renderImage (photos){
    const photoParent = document.querySelector('.grid');
    photos.forEach((photo) => {
        const cols = createElements('div', 'col');
        const divCard = createElements('div', 'card');
        const newPhoto = createElements('img', 'card-img-top');
        const cardBody = createElements('div', 'card-body');
        const text = createElements('p', 'card-text');
 
        newPhoto.src = photo.src.tiny;
        text.innerText = photo.photographer;

        photoParent.appendChild(cols);
        cols.appendChild(divCard);
        divCard.appendChild(newPhoto);
        divCard.appendChild(cardBody);
        cardBody.appendChild(text);
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
    if (!select){
        alert('Selecione o tipo de mídia');
    } else if (select.classList.contains('photo-btn')){
        return getImage();
    }
    return getVideo();
}

queryBtn.addEventListener('click',chooseType);
photoBtn.addEventListener('click', addSelected);
videoBtn.addEventListener('click', addSelected);
