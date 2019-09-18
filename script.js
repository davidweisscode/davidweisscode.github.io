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
    }

    initSlideshow() {
        this.imagesLoaded = 0;
        this.current = 1;
        this.prev = 1;
        this.next = 1;
        $("#" + this.prev).addClass("prev");
        $("#" + this.next).addClass("next");
    }

    finishLoadingImage() {
        this.imagesLoaded++;
        if(this.imagesLoaded >= this.slides.length) {
            this.playSlideshow();
        }
    }

    playSlideshow() {
        this.slideshow = window.setInterval(() => {
            this.showNextSlide()
        }, 1500);
    }

    showNextSlide() {
        this.current++;
        if(this.current > this.slides.length) {
            this.current = 1;
        }

        $("#" + this.prev).removeClass('prev fade-out');
        $("#" + this.next).removeClass('next');

        this.prev = this.next;
        $("#" + this.prev).addClass('prev');
        $("#" + this.prev).addClass('fade-out');

        this.next = this.current;
        $("#" + this.next).addClass('next');

        // $('.slideheader').text(this.nextSlideID.attr('slide-description'));
        // $('.img-container a').attr('href', this.nextSlideID.attr('slide-link'));
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
