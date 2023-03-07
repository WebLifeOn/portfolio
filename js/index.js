const year = new Date().getFullYear();
document.querySelector("#experience_ye").innerHTML = year - 2019;

// Global
let win = window,
  doc = document;

// Global Functions

function hasClass(el, cls) {
  return el.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function addClass(el, cls) {
  if (!this.hasClass(el, cls)) {
    el.className += " " + cls;
  }
}

function removeClass(el, cls) {
  if (this.hasClass(el, cls)) {
    let reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    el.className = el.className.replace(reg, " ");
  }
}

// Elements

let site = doc.getElementsByClassName("site-wrap")[0];
let wrap = doc.getElementsByClassName("panel-wrap")[0];

let panel = doc.getElementsByClassName("panel");

let zoom = doc.getElementsByClassName("js-zoom");
let siteWrap  = document.querySelector('.site-wrap');

let nav_up = doc.getElementsByClassName("js-up"),
  nav_left = doc.getElementsByClassName("js-left"),
  nav_right = doc.getElementsByClassName("js-right"),
  nav_down = doc.getElementsByClassName("js-down");


// Tracking
let pos_x = 0,
  pos_y = 0;

function setPos() {
  wrap.style.transform =
    "translateX(" + pos_x + "00%) translateY(" + pos_y + "00%)";
  setTimeout(function() {
    removeClass(wrap, "animate");
  }, 600);
}

setPos();

function moveUp() {

  if( pos_y == '1'){
    return false;
  }

  addClass(wrap, "animate");
  pos_y++;
  setPos();

}

function moveLeft() {

  if( pos_x == '1'){
    return false;
  }

  addClass(wrap, "animate");
  pos_x++;
  setPos();

}

function moveRight() {

  if( pos_x == '-1'){
    return false;
  }

  addClass(wrap, "animate");
  pos_x--;
  setPos();

}

function moveDown() {

  if( pos_y == '-1'){
    return false;
  }

  addClass(wrap, "animate");
  pos_y--;
  setPos();

}

function moveCenter() {
  addClass(wrap, "animate");
  pos_y = 0;
  pos_x = 0;
  setPos();
}

for (let x = 0; x < nav_up.length; x++) {
  nav_up[x].addEventListener("click", moveUp);
}

for (let x = 0; x < nav_left.length; x++) {
  nav_left[x].addEventListener("click", moveLeft);
}

for (let x = 0; x < nav_right.length; x++) {
  nav_right[x].addEventListener("click", moveRight);
}

for (let x = 0; x < nav_down.length; x++) {
  nav_down[x].addEventListener("click", moveDown);
}

for (let x = 0; x < zoom.length; x++) {
  zoom[x].addEventListener("click", zoomOut);
}

function zoomOut(e) {
  e.stopPropagation();
  moveCenter();
  addClass(site, "show-all");
  for (let x = 0; x < panel.length; x++) {
    (function(_x) {
      panel[_x].addEventListener("click", setPanelAndZoom);
    })(x);
  }
}

function setPanelAndZoom(e) {
  (pos_x = -e.target.getAttribute(
    "data-x-pos"
  )), (pos_y = e.target.getAttribute("data-y-pos"));
  setPos();
  zoomIn();
}

function zoomIn() {
  for (let x = 0; x < panel.length; x++) {
    panel[x].removeEventListener("click", setPanelAndZoom);
  }
  removeClass(site, "show-all");
}

// animation main text
document.addEventListener("DOMContentLoaded", function(event) {
  animation_text_1(".main_info_h1");
  animation_text_3(".main_info_job");
});

function animation_text_1(element) {
  var newText = "";
  var theText = document.querySelector(element);
  for (i = 0; i < theText.innerText.length; i++) {
    newText += "<span>";
    if (theText.innerText[i] == " ") {
      newText += "&nbsp;";
    } else {
      newText += theText.innerText[i];
    }
    newText += "</span>";
  }
  theText.innerHTML = newText;
  var targetsDiv = document.querySelectorAll(element + " span");
  TweenMax.staggerFromTo(
    targetsDiv,
    2,
    { opacity: 0, y: 90, ease: Elastic.easeOut.config(1.2, 0.5) },
    { opacity: 1, y: 0, ease: Elastic.easeOut.config(1.2, 0.5) },
    0.03
  );
}

function animation_text_3(element) {
  var newText = "";
  var theText = document.querySelector(element);
  for (i = 0; i < theText.innerText.length; i++) {
    newText += "<span>";
    if (theText.innerText[i] == " ") {
      newText += "&nbsp;";
    } else {
      newText += theText.innerText[i];
    }
    newText += "</span>";
  }
  theText.innerHTML = newText;
  var targetsDiv = document.querySelectorAll(element + " span");
  TweenMax.staggerFromTo(
    targetsDiv,
    2,
    { opacity: 0, y: -90, ease: Elastic.easeOut.config(1.2, 0.5) },
    { opacity: 1, y: 0, ease: Elastic.easeOut.config(1.2, 0.5) },
    0.03
  );
}

// start cursor animation

let cursor = document.querySelector(".cursor");
let cursorScale = document.querySelectorAll(".cursor-scale");
let mouseX = 0;
let mouseY = 0;

gsap.to({}, 0.016, {
  repeat: -1,
  onRepeat: function() {
    gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY
      }
    });
  }
});

window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

cursorScale.forEach(link => {
  link.addEventListener("mousemove", () => {
    cursor.classList.add("grow");
    if (link.classList.contains("small")) {
      cursor.classList.remove("grow");
      cursor.classList.add("grow-small");
    }
  });

  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
    cursor.classList.remove("grow-small");
  });
});

// end cursor animation


const adviceBlock =  document.querySelector("#advice");
fetch("https://api.adviceslip.com/advice")
  .then(response => response.json())
  .then(adviceslip => adviceBlock.innerHTML = adviceslip.slip.advice )
  .catch(e => adviceBlock.innerHTML = 'Identify sources of happiness.');






//
//   Variables
//
//////////////////////////////////////////////////////////////////////

// Play with this value to change the speed
let tickerSpeed = 2;

let flickity = null;
let isPaused = false;
const slideshowEl = document.querySelector('.js-slideshow');


//
//   Functions
//
//////////////////////////////////////////////////////////////////////

const update = () => {
  if (isPaused) return;
  if (flickity.slides) {
    flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
    flickity.selectedIndex = flickity.dragEndRestingSelect();
    flickity.updateSelectedSlide();
    flickity.settle(flickity.x);
  }
  window.requestAnimationFrame(update);
};

const pause = () => {
  isPaused = true;
};

const play = () => {
  if (isPaused) {
    isPaused = false;
    // window.requestAnimationFrame(update);
  }
};


//
//   Create Flickity
//
//////////////////////////////////////////////////////////////////////

flickity = new Flickity(slideshowEl, {
  // autoPlay: 3000,
  prevNextButtons: false,
  pageDots: false,
  draggable: true,
  wrapAround: true,
  selectedAttraction: 0.015,
  friction: 0.25
});
flickity.x = 0;




//
//   Add Event Listeners
//
//////////////////////////////////////////////////////////////////////

slideshowEl.addEventListener('mouseenter', pause, false);
slideshowEl.addEventListener('focusin', pause, false);
slideshowEl.addEventListener('mouseleave', play, false);
slideshowEl.addEventListener('focusout', play, false);

flickity.on('dragStart', () => {
  isPaused = true;
});


//
//   Start Ticker
//
//////////////////////////////////////////////////////////////////////

// update();


var container = document.querySelector('body');
  var listener = SwipeListener(container);
  container.addEventListener('swipe', function (e) {
    var directions = e.detail.directions;
  var x = e.detail.x;
  var y = e.detail.y;

  if( hasClass( siteWrap, 'show-all')  ){
    return false;
  }

  
 
  if (directions.left) {
    moveRight();
  }
 
  if (directions.right) {
    moveLeft();
  }
 
  if (directions.top) {
    moveDown();
  }
 
  if (directions.bottom) {
    moveUp();
  }
 
  
});



let flktyPortfolio = new Flickity( '.portfolio-slider', {
  fade: true,
  prevNextButtons: false,
  pageDots: false,
  wrapAround: true,
  autoPlay: 1500
});


const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()
