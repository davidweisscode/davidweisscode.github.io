import {slides} from "./slides.js";

class Slideshow {
    constructor(slides) {
        this.slides = slides;
        this.initSlides(slides);
        this.initSlideshow();
    }

    initSlides(slides) {
        slides.forEach(slide => {
            let image = document.createElement("img");
            image.src = slide.image;
            image.id = slide.id;
            $(".slideshow").append(image);
            $(".slideshow img:last-child").on('load', $.proxy(this.finishLoadingImage, this));
        });

        // this.container = $('[data-slideshow]'); // Select by attribute --> img-container
        // this.slides = this.container.find('img'); // Get all image elements
        // this.slides.each((idx, slide) => {
        //     $(slide).attr('slide-id', $(slide).attr('id'));
        //     $(slide).attr('slide-description', slideDescriptions[$(slide).attr('id')]);
        //     $(slide).attr('slide-link', slideLinks[$(slide).attr('id')]);
        // });
    }

    initSlideshow() {
        this.imagesLoaded = 0;
        this.currentIndex = 1;
        this.prevSlide = 1;
        this.nextSlide = 2;
        $("#" + this.prevSlide).addClass("prev");
        $("#" + this.nextSlide).addClass("next");
        // this.slides.each((idx, slide) => {
        //   $('<img>').on('load', $.proxy(this.finishLoadingImage, this)).attr('src', $(slide).attr('src'));
        // });
    }

    finishLoadingImage() {
        this.imagesLoaded++;
        if(this.imagesLoaded >= this.slides.length) {
            this.playSlideshow();
        }
    }

    // setNextSlide() {
    //     $("#" + this.currentIndex).addClass("next");
    // }

    playSlideshow() {
        this.slideshow = window.setInterval(() => {
            this.showNextSlide()
        }, 1500);
    }

    showNextSlide() {
        $("#" + this.prevSlide).removeClass('prev fade-out');
        $("#" + this.nextSlide).removeClass('next');
        
        this.prevSlide = this.nextSlide;
        $("#" + this.prevSlide).addClass('prev');

        this.currentIndex++;
        if(this.currentIndex > this.slides.length) {
            this.currentIndex = 1;
        }

        this.nextSlide = this.currentIndex;
        $("#" + this.nextSlide).addClass('next');
        $("#" + this.prevSlide).addClass('fade-out');

        // $('.header').text(this.nextSlide.attr('slide-description'));
        // $('.img-container a').attr('href', this.nextSlide.attr('slide-link'));
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

$(document).ready(function() {
    new Slideshow(slides);
});
