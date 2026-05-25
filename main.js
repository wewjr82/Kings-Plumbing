// MOBILE MENU

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});


// REVIEW SLIDER

const reviews = document.querySelectorAll('.review');

let currentReview = 0;

function showReview(index){

  reviews.forEach(review => {
    review.classList.remove('active');
  });

  reviews[index].classList.add('active');
}

function nextReview(){

  currentReview++;

  if(currentReview >= reviews.length){
    currentReview = 0;
  }

  showReview(currentReview);
}

setInterval(nextReview, 5000);

showReview(currentReview);


// CONTACT FORM

const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {

  e.preventDefault();

  alert('Thank you! Kings Plumbing will contact you shortly.');

  form.reset();

});


// GALLERY LIGHTBOX & LOAD MORE FUNCTIONALITY

const galleryItems = document.querySelectorAll('.gallery-item');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const itemsToShow = 6; 
let currentDisplayed = itemsToShow;

// 1. Initial Setup: Hide images past the first 6
galleryItems.forEach((item, index) => {
  if (index >= itemsToShow) {
    item.classList.add('hidden');
  }
});

// 2. Load More Button Click Event
loadMoreBtn.addEventListener('click', () => {
  let itemsRevealed = 0;
  
  galleryItems.forEach((item) => {
    if (item.classList.contains('hidden') && itemsRevealed < itemsToShow) {
      item.classList.remove('hidden');
      itemsRevealed++;
    }
  });

  currentDisplayed += itemsRevealed;

  if (currentDisplayed >= galleryItems.length) {
    loadMoreBtn.style.display = 'none';
  }
});

// 3. Create Lightbox Elements (Added the .lightbox-caption div)
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
lightbox.innerHTML = `
  <span class="lightbox-close">&times;</span>
  <img src="" alt="">
  <div class="lightbox-caption"></div>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const closeBtn = lightbox.querySelector('.lightbox-close');

// 4. Attach Click Events to Images
document.querySelector('.gallery-grid').addEventListener('click', (e) => {
  const clickedImg = e.target.closest('.gallery-item img');
  if (!clickedImg) return;

  // Find the parent gallery item container
  const galleryItem = clickedImg.closest('.gallery-item');
  // Find the text inside the caption paragraph element
  const captionText = galleryItem.querySelector('.gallery-caption');

  lightbox.classList.add('active');
  lightboxImg.src = clickedImg.src;
  
  // If a caption exists, display it; otherwise, leave it blank
  lightboxCaption.textContent = captionText ? captionText.textContent : "";
});

// 5. Close Lightbox Events
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});