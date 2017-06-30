var writeusLink = document.querySelector(".write-us");
var writeusPopUp = document.querySelector(".pop-up-write-us");

if (writeusLink && writeusPopUp) {
  var writeusClose = writeusPopUp.querySelector(".pop-up-close");
  var writeusName = writeusPopUp.querySelector("#feedback-name");
  writeusLink.addEventListener("click", function(event) {
    event.preventDefault();
    writeusPopUp.classList.add("pop-up-show");
    writeusName.focus();
  });
  writeusClose.addEventListener("click", function(event) {
    event.preventDefault();
    writeusPopUp.classList.remove("pop-up-show");
  });
  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (writeusPopUp.classList.contains("pop-up-show")) {
        writeusPopUp.classList.remove("pop-up-show");
      }
    }
  });
}

var roadmapLink = document.querySelector(".road-map-small");
var roadmapPopUp = document.querySelector(".pop-up-road-map-big");

if (roadmapLink && roadmapPopUp) {
  var roadmapClose = roadmapPopUp.querySelector(".pop-up-close");
  roadmapLink.addEventListener("click", function(event) {
    event.preventDefault();
    roadmapPopUp.classList.add("pop-up-show");
  });
  roadmapClose.addEventListener("click", function(event) {
    event.preventDefault();
    roadmapPopUp.classList.remove("pop-up-show");
  });
  window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
      if (roadmapPopUp.classList.contains("pop-up-show")) {
        roadmapPopUp.classList.remove("pop-up-show");
      }
    }
  });
}

var cartplusLinks = document.querySelectorAll(".add-to-cart");
var cartplusPopUp = document.querySelector(".pop-up-cart-plus");
var cartplusCloses = cartplusPopUp.querySelectorAll("button");
var cartplusOrder = cartplusPopUp.querySelector("a");

for (var i=0; i<cartplusLinks.length; i++) {
  cartplusLinks[i].addEventListener("click", function(event) {
    event.preventDefault();
    cartplusPopUp.classList.add("pop-up-show");
    cartplusOrder.focus();
  });
};

for (var i=0; i<cartplusCloses.length; i++) {
  cartplusCloses[i].addEventListener("click", function(event) {
    event.preventDefault();
    cartplusPopUp.classList.remove("pop-up-show");
  });
}

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (cartplusPopUp.classList.contains("pop-up-show")) {
      cartplusPopUp.classList.remove("pop-up-show");
    }
  }
});
