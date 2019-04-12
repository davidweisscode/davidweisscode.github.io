class Slideshow {
    constructor() {
        this.initSlides();
        this.initSlideshow();
    }

    initSlides() {
        this.container = $('[data-slideshow]'); // Select every element containing the attribute
        this.slides = this.container.find('object'); // Get all elements // object instead of object ?
        this.slides.each((idx, slide) => $(slide).attr('data-slide', idx));
    }

    initSlideshow() {
        this.imagesLoaded = 0;
        this.currentIndex = 0;
        this.setNextSlide();
        this.slides.each((idx, slide) => {
          $('<object>').on('load', $.proxy(this.loadImage, this)).attr('data', $(slide).attr('data')); // ?
        });
    }

    loadImage() {
        this.imagesLoaded++;
        if(this.imagesLoaded >= this.slides.length) {
            this.playSlideshow();
        }
    }

    setNextSlide() {
        this.nextSlide = this.container.find(`[data-slide="${this.currentIndex}"]`).first();
        this.nextSlide.addClass('next');
    }

    playSlideshow() {
        this.slideshow = window.setInterval(() => {
            this.performSlide()
        }, 1500);
    }

    performSlide() {
        if(this.prevSlide) {
            this.prevSlide.removeClass('prev fade-out')
        }
        this.nextSlide.removeClass('next');

        this.prevSlide = this.nextSlide;
        this.prevSlide.addClass('prev');

        this.currentIndex++;
        if(this.currentIndex >= this.slides.length) {
            this.currentIndex = 0
        }

        this.setNextSlide();

        this.prevSlide.addClass('fade-out');
    }
}

$(document).ready(function() {
    new Slideshow();
})
