const client = '563492ad6f91700001000001aea7b8da8c8846e0a4ae821bc72bf91d';

async function getImage() {
    const headers = new Headers({
        'Authorization': client,
    })


    const response = await fetch('https://api.pexels.com/v1/search?query=london&per_page=9', {
        method: 'GET',
        headers,
    })
    const data = await response.json();
    const photo = data.photos;
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
    console.log(data.videos[0].video_files[0].link)
    const videoFile = data.videos[0].video_files[0].link;
    video.src = videoFile;
    

}

function renderImage (fotos){
    const photos = document.querySelector('.photo');
    // fotos
    
}

window.onload = () => {
    getImage()
    getVideo()
}