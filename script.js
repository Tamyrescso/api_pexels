const client = '563492ad6f91700001000001aea7b8da8c8846e0a4ae821bc72bf91d';
const image = document.getElementById('example');

async function getImage() {
    const headers = new Headers({
        'Authorization': client,
    })

    const response = await fetch('https://api.pexels.com/v1/search?query=nature&per_page=9', {
        method: 'GET',
        headers,
    })
    const data = await response.json();
    console.log(data.photos[0].src)
    const photo = data.photos[0].src.tiny;
    image.src = photo

}

window.onload = getImage();