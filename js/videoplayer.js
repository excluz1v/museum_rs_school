let player__progress_done = document.querySelector('.player__progress-done')
let player__volume_done = document.querySelector('.player__volume-done')
let player__progress = document.querySelector('.player__progress')
let player__volume = document.querySelector('.player__volume')
let player__sound = document.querySelector('.player__sound')
let player__size = document.querySelector('.player__size')
let video__player = document.querySelector('.video__player')
let video__slider = document.querySelector('.video__slider')
let video__slider__nav = document.querySelector('.video__slider-nav')
let video__slider__for = document.querySelector('.video__slider-for')
const playButton = document.querySelector('.player__play');



document.addEventListener('keydown', (e) => {
    let activeVideoIndex = findIndexOfActiveVideo()
    console.log(players[activeVideoIndex]?.getIframe())

    if (e.code === 'KeyM' && activeVideoIndex >= 0) {
        if (player__sound.classList.contains('player__mute')) {
            player__sound.classList.remove('player__mute')
            players[activeVideoIndex].unMute()
        } else {
            player__sound.classList.add('player__mute')
            players[activeVideoIndex].mute()
        }
    } else if (e.code === 'KeyF' && activeVideoIndex >= 0) {
        let iframeparent = players[findIndexOfActiveVideo()].getIframe()
        let barier = document.querySelector('.video__slider-for .slick-list')

        if (!document.fullscreenElement) {
            video__slider__nav.classList.add('display')

            video__slider.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });

            barier.classList.add('video__fullscreen')
            iframeparent.classList.add('video__fullscreen')
            video__player.classList.add('video__player__fullscreen')
            video__player.style.padding = '0 100px 10px 100px'

        } else {
            video__slider__nav.classList.remove('display')
            barier.classList.remove('video__fullscreen')
            iframeparent.classList.remove('video__fullscreen')
            video__player.classList.remove('video__player__fullscreen')
            video__player.style.padding = '0 30px 10px 30px'
            document.exitFullscreen();
        }
    } else if (e.code === ' ' && activeVideoIndex >= 0) {

        if (players[activeVideoIndex].getPlayerState() == 2 && state == true) {
            state = false;
            playButton.classList.remove('player__pause')
            players[activeVideoIndex].pauseVideo()
        } else if (players[activeVideoIndex].getPlayerState() == 1 && state == false) {
            state = true;
            playButton.classList.add('player__pause')
            players[activeVideoIndex].playVideo()
        } else if (players[activeVideoIndex].getPlayerState() == 1 && state == true) {
            StopAllVideos()
            state = false
            players[activeVideoIndex].playVideo();
        } else if (players[activeVideoIndex].getPlayerState() == 0) {
            playButton.classList.remove('player__pause')
        }

    } else if (e.code == 'Comma' && e.shiftKey && activeVideoIndex >= 0) {
        //ускорение
        let speed = players[activeVideoIndex].getPlaybackRate()
        players[activeVideoIndex].setPlaybackRate(speed + 0.25)
    } else if (e.code == 'Period' && e.shiftKey && activeVideoIndex >= 0) {
        //замедление
        let speed = players[activeVideoIndex].getPlaybackRate()
        players[activeVideoIndex].setPlaybackRate(speed - 0.25)
    }
})



player__size.onclick = () => {
    let iframeparent = players[findIndexOfActiveVideo()].getIframe()
    let barier = document.querySelector('.video__slider-for .slick-list')

    if (!document.fullscreenElement) {
        video__slider__nav.classList.add('display')

        video__slider.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });

        barier.classList.add('video__fullscreen')
        iframeparent.classList.add('video__fullscreen')
        video__player.classList.add('video__player__fullscreen')
        video__player.style.padding = '0 100px 10px 100px'

    } else {
        video__slider__nav.classList.remove('display')
        barier.classList.remove('video__fullscreen')
        iframeparent.classList.remove('video__fullscreen')
        video__player.classList.remove('video__player__fullscreen')
        video__player.style.padding = '0 30px 10px 30px'
        document.exitFullscreen();
    }
}

player__sound.onclick = () => {

    let activeVideoIndex = findIndexOfActiveVideo()
    if (player__sound.classList.contains('player__mute')) {
        player__sound.classList.remove('player__mute')
        players[activeVideoIndex].unMute()
    } else {
        player__sound.classList.add('player__mute')
        players[activeVideoIndex].mute()
    }



}

player__progress.onchange = function () {
    let activeVideoIndex = findIndexOfActiveVideo()
    let duration = players[activeVideoIndex]?.getDuration()
    videotime = players[activeVideoIndex]?.getCurrentTime()
    const percent = Math.ceil10((videotime / duration) * 100, -1);
    player__progress_done.style.width = `calc(${percent}% - 5px)`
}
player__progress.oninput = function () {
    let activeVideoIndex = findIndexOfActiveVideo()
    let duration = players[activeVideoIndex]?.getDuration()
    players[activeVideoIndex].seekTo(+player__progress.value)
    videotime = players[activeVideoIndex]?.getCurrentTime()
    const percent = Math.ceil10((videotime / duration) * 100, -1);
    player__progress_done.style.width = `calc(${percent}% - 5px)`

}

let volume

player__volume.oninput = function (e) {
    let activeVideoIndex = findIndexOfActiveVideo()
    let isMuted = players[activeVideoIndex]?.isMuted()
    volume = players[activeVideoIndex]?.setVolume(+e.target.value)
    player__volume_done.style.width = `calc(${this.value}% - 2px)`
    if (e.target.value == 0) {
        player__sound.classList.add('player__mute')
    }
    else if (e.target.value != 0 && player__sound.classList.contains('player__mute')) {
        player__sound.classList.remove('player__mute')
    }
    else if (isMuted && e.target.value != 0) {
        players[activeVideoIndex].unMute()
    }
}



// Display video from youtube


function findVideos() {
    let videos = document.querySelectorAll('.video__slider-item');
    for (let i = 0; i < videos.length; i++) {
        setupVideo(videos[i]);
    }

}

function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__content');
    let button = video.querySelector('.video__slider__play');
    let id = parseMediaURL(media);
    video.setAttribute('id', id)

    video.addEventListener('click', () => {
        link.removeAttribute('href');
        let iframe = createIframe(id, id);
        link.remove();
        button.remove();
        player__progress.value = 0
        player__progress_done.style.width = `0px`
        playButton.classList.toggle('player__pause')
        video.appendChild(iframe);

    })
    playButton.addEventListener('click', () => {
        const videoSliderFor = document.querySelector('.video__slider-for')
        let mainSlideCurrent = videoSliderFor.querySelector('.slick-current')
        playButton.focus()

        if (mainSlideCurrent.contains(video)) {
            console.log('object')
            let iframe = createIframe(id, id);
            link.remove();
            button.remove();
            playButton.classList.toggle('player__pause')
            video.appendChild(iframe);
            link.removeAttribute('href');

        }

    })

}

function parseMediaURL(media) {
    let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.webp/i;
    let url = media.src;
    let match = url.match(regexp);
    return match[1];
}

let players = []
function createIframe(id, newid) {
    let player = new YT.Player(newid, {
        width: '100%',
        videoId: id,
        playerVars: { 'autoplay': 1, 'playsinline': 1, "enablejsapi": 1, 'rel': 0, "controls": 0, "disablekb": 1, "fs": 0, "iv_load_policy": 3, "modestbranding": 1 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
    players.push(player)
    players.map(el => {
        el.addEventListener()
    })
    return player
}
let state = false
let videotime = 0;
let timeupdater = null;

function onPlayerReady(event) {
    playButton.focus()
    StopAllVideos()
    event.target.playVideo();
    timeupdater = setInterval(updateTime, 1000);
}

function onPlayerStateChange(event) {
    playButton.focus()
    if (event.data == YT.PlayerState.PLAYING && state == false) {
        state = true
        playButton.classList.add('player__pause')
        event.target.playVideo(event)

    } else if (event.data == YT.PlayerState.PAUSED && state == true) {
        state = false;
        playButton.classList.remove('player__pause')
        event.target.pauseVideo(event);
    } else if (event.data == YT.PlayerState.PLAYING && state == true) {
        StopAllVideos()
        state = false
        event.target.playVideo(event);
    } else if (event.data == 0) {
        playButton.classList.remove('player__pause')
    }
}

function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}
if (!Math.ceil10) {
    Math.ceil10 = function (value, exp) {
        return decimalAdjust('ceil', value, exp);
    };
}

function updateTime() {
    let oldTime = videotime;
    let index = findIndexOfActiveVideo()
    let duration = players[index].getDuration()

    player__progress.max = duration
    if (players[index] && players[index].getCurrentTime) {
        videotime = players[index].getCurrentTime();
    }
    if (videotime !== oldTime) {
        player__progress.value = videotime;
        const percent = Math.ceil10((videotime / duration) * 100, -1);
        if (percent < 50) player__progress_done.style.width = `calc(${percent}% - 3px)`
        else player__progress_done.style.width = `calc(${percent}% - 6px)`

    }

}


findVideos();

function StopAllVideos() {

    let iframes = document.querySelectorAll('iframe');
    Array.prototype.forEach.call(iframes, iframe => {
        iframe.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'pauseVideo'
        }), '*');
    });

}
exports = { StopAllVideos }

// video slider nav


function findSliderVideos() {
    let sliderVideos = document.querySelectorAll('.video__slide-btn')
    for (let i = 0; i < sliderVideos.length; i++) {
        setupSliderVideo(sliderVideos[i], i);
    }
}

function setupSliderVideo(video, index) {

    let link = video.querySelector('.video__slide-link');
    let media = video.querySelector('.video__slide-content');

    let id = parseMediaURL(media);
    video.setAttribute('id', id + index)

    video.addEventListener('click', () => {
        let iframe = createIframe(id, id + index);
        link.remove();
        video.appendChild(iframe);
    })
    link.removeAttribute('href');
}


findSliderVideos();

// video player

function findIndexOfActiveVideo() {
    const videoSliderFor = document.querySelector('.video__slider-for')
    let mainSlideCurrent = videoSliderFor.querySelector('.slick-current')
    let activeIframeId = mainSlideCurrent?.querySelector('iframe')?.getAttribute("id")

    return players.findIndex(el => {
        return el['h']['id'] === activeIframeId
    })
}


playButton.addEventListener("click", function () {
    let activeVideoIndex = findIndexOfActiveVideo()

    let status = players[activeVideoIndex]?.getPlayerState() ? players[activeVideoIndex]?.getPlayerState() : null

    if (status === 1) {
        playButton.classList.toggle('player__pause')
        players[activeVideoIndex].pauseVideo()
        clearInterval(timeupdater)
    } else if (status === 2) {
        playButton.classList.toggle('player__pause')
        players[activeVideoIndex].playVideo()
        timeupdater = setInterval(updateTime, 1000);

    }

});
