const pictureInnerContainer = document.querySelector('.picture__container-inner');

function gallaryDiv(pictureNumber) {
    return `<div data-scroll class="gallery__img-wrapper"><img class="gallery__img" src="./assets/img/gallery/galery${pictureNumber}.webp" alt="galery picture #${pictureNumber}"></div>`
}
let pictureNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
shuffle(pictureNumbers).map(el => {
    pictureInnerContainer.innerHTML += gallaryDiv(el)
})

let closeButton = document.querySelector('.tickets__form-wrapper-close')
let tickets__form = document.querySelector('.tickets__form-wrapper')
let booking__form = document.querySelector('.booking__form-wrapper')
let submit_tickets_button = document.querySelector('.tickets__submit')




closeButton.onclick = function () {
    tickets__form.classList.remove('fadeOut')
    tickets__form.classList.add('fade-left')
    booking__form.classList.toggle('fadeOut')
    setTimeout(() => {
        booking__form.classList.toggle('display')
        booking__form.classList.remove('fade-left')
        tickets__form.classList.toggle('display')
    }, 1000);
}



submit_tickets_button.onclick = function (e) {
    e.preventDefault();
    tickets__form.classList.add('fadeOut')
    booking__form.classList.remove('fadeOut')
    setTimeout(() => {
        tickets__form.classList.toggle('display')
        booking__form.classList.toggle('display')
    }, 1000);
    booking__form.classList.add('fade-left')
}
