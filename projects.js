import {slides} from "./slides.js";

let currentProjectId;

window.onhashchange = function() {
    showContent();
}

window.onload = function() {
    showContent();
}

function showContent() {
    if(location.hash === "") {
        currentProjectId = 1; // Default project
    } else {
        currentProjectId = location.hash.slice(1);
    }
    $(".mid img").attr("src", slides[currentProjectId - 1].image);
    $(".mid h1").html(slides[currentProjectId - 1].header);
    $(".mid p").html(slides[currentProjectId - 1].description);
}
