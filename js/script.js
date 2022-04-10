$(document).ready(function () {

    //welcome slider
    $('.welcome__slider-wrapper').slick({
        dots: true,
        infinite: true
    });
    let slickObj = $('.welcome__slider-wrapper').slick("getSlick")
    let currentSliderIndex = $('.welcome__slider-wrapper').slick('slickCurrentSlide') + 1;
    let slidesCount = slickObj.slideCount
    $('.welcome__slider-tracker').html(`0${currentSliderIndex} \u00A0|\u00A0 0${slidesCount}`)
    $('.welcome__slider-wrapper').on("afterChange", (slick, currentSlide) => {
        $('.welcome__slider-tracker').html(`0${currentSlide.currentSlide + 1}\u00A0 |\u00A0 0${slidesCount}`)
    })


    // video slider
    $('.video__slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        fade: true,
        asNavFor: '.video__slider-nav',

    });
    $('.video__slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.video__slider-for',
        dots: true,
        arrows: true,
        centerMode: false,
        infinite: true,
        variableWidth: true,
    });

    let videoSliderNavigation = document.querySelector('#video__slider-nav')
    videoSliderNavigation.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            StopAllVideos()
            playButton.classList.remove('player__pause')
        } else return

    })




    // Burger Menu

    let burgerButton = document.querySelector('.burger__button')
    let welcomeText = document.querySelector('.welcome__text')
    let burgerMenu = document.querySelector('.burger__menu')
    let body = document.querySelector('body')

    function closeBurger(e) {
        e.stopPropagation()
        if (!burgerButton.classList.contains('active')) {
            burgerMenu.classList.remove('fade-left')
            burgerMenu.classList.remove('fadeOut')
            burgerMenu.classList.toggle('display')
            welcomeText.classList.remove('fadeOut')
            burgerMenu.classList.add('fade-left')
            welcomeText.classList.toggle('fadeOut')
            setTimeout(() => {
                burgerMenu.classList.remove('fade-left')
                welcomeText.classList.toggle('display')
            }, 1000);
            burgerButton.classList.toggle('active')
        } else {
            burgerButton.classList.toggle('active')
            welcomeText.classList.remove('fadeOut')
            burgerMenu.classList.add('fadeOut')
            welcomeText.classList.add('fade-left')
            setTimeout(() => {
                welcomeText.classList.toggle('display')
                burgerMenu.classList.toggle('display')
            }, 1000);
            burgerMenu.classList.add('fade-left')
        }

    }

    burgerButton.onclick = closeBurger
    window.onclick = function (e) {

        if (!document.querySelector('.burger__menu').contains(e.target) && welcomeText.classList.contains('display')) {
            burgerButton.classList.toggle('active')
            welcomeText.classList.remove('fadeOut')
            burgerMenu.classList.add('fadeOut')
            welcomeText.classList.add('fade-left')
            setTimeout(() => {
                welcomeText.classList.toggle('display')
                burgerMenu.classList.toggle('display')
            }, 1000);
            burgerMenu.classList.add('fade-left')

        }
    }
    ScrollOut({
        onShown: function (el) {
            // remove the class
            el.classList.remove("animate__slideInUp");

            // force reflow
            void el.offsetWidth;

            // re-add the animated cl
            el.classList.add("animate__slideInUp");
        },

    },

    );
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhjbHV6MXYiLCJhIjoiY2t1bXhybG9hMWk5NTJvcnY2aG1jZGt4eiJ9.QXP6VcYVPsEyPlhPf2OdJw';
    const geojson = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [2.3364, 48.86091]
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [2.3333, 48.8602]
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [2.3397, 48.8607]
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [2.3330, 48.8619]
                },
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [2.3365, 48.8625]
                },
            }
        ]
    };

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center: [2.336, 48.86],
        zoom: 15
    });
    for (const { geometry, properties } of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat(geometry.coordinates).addTo(map);
    }

});


