const swiperWrapper = document.getElementById('swiperWrapper');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prev'); 
const nextBtn = document.getElementById('next');
const currentPageEl = document.querySelector('#pagination .currentPage');
const lastPageEl = document.querySelector('#pagination .lastPage');
const progressbar = document.getElementById('progressbar');
const progressFill = document.getElementById('progressFill');
const swiperContainer = document.getElementById('swiperContainer');
const sliderWidth = swiperContainer.offsetWidth;

const slideCount = slides.length;

const slidePositions = [];
let position = 0;

slides.forEach((slide, index) => {
  slidePositions.push(position);
  const style = getComputedStyle(slide);
  const slideWidth = slide.offsetWidth;
  const marginRight = parseInt(style.marginRight, 10);
  position += slideWidth + marginRight;
});

const totalSlidesWidth = position;

const averageSlideWidth = totalSlidesWidth / slideCount;
const slidesPerView = Math.round(sliderWidth / averageSlideWidth);

const maxIndex = Math.max(slideCount - slidesPerView, 0);

const totalPages = maxIndex > 0 ? maxIndex + 1 : 1;
lastPageEl.textContent = totalPages;

const progressBarWidth = progressbar.offsetWidth;
const progressFillWidth = progressBarWidth * totalPages / slideCount;
progressFill.style.width = `${progressFillWidth}px`;

function updateProgressFill(currentPage, totalPages) {
  
  const moveLength = (progressBarWidth - progressFillWidth) / (totalPages - 1);
  const leftPos = moveLength * (currentPage - 1);
  progressFill.style.left = `${leftPos}px`;
}

let currentIndex = 0;

function updateSlidePosition() {
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const translateX = -slidePositions[currentIndex];
  swiperWrapper.style.transition = 'transform 0.5s ease';
  swiperWrapper.style.transform = `translateX(${translateX}px)`;

  const currentPage = currentIndex + 1;
  currentPageEl.textContent = currentPage;

  updateProgressFill(currentPage, totalPages);

  prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
  nextBtn.style.visibility = currentIndex === maxIndex ? 'hidden' : 'visible';
}

updateSlidePosition();

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlidePosition();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateSlidePosition();
  }
});