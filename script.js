import {slides} from "./slides.js";

class Slideshow {
    constructor(slides) {
        this.slides = slides;
        this.initSlides(slides);
        this.initSlideshow();
    }

    initSlides(slides) {
        slides.forEach(slide => {
            let link = document.createElement("a");
            link.href = slide.link;
            let image = document.createElement("img");
            image.src = slide.image;
            image.id = slide.id;
            $(".slideshow").append(link);
            $(".slideshow a:last-child").append(image);
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

        $('.slideheader').text(this.slides[this.current - 1].header);
    }
}

// TODO: Random slideshow order with fixed starter slide
async function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

$(document).ready(function() {
    new Slideshow(slides);
});
