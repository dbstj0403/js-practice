document.addEventListener('DOMContentLoaded', () => {
    const swiperWrapper = document.getElementById('swiperWrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const currentPageEl = document.querySelector('#pagination .currentPage');
    const lastPageEl = document.querySelector('#pagination .lastPage');
    const progressbar = document.getElementById('progressbar');
    const progressFill = document.getElementById('progressFill');
  
    const swiperContainer = document.getElementById('swiperContainer');
    const containerWidth = swiperContainer.offsetWidth;
  
    const slideCount = slides.length;
  
    // 각 슬라이드 누적 위치 배열 생성
    const slidePositions = [];
    let position = 0;
  
    slides.forEach((slide, index) => {
      slidePositions.push(position);
      const style = getComputedStyle(slide);
      const slideWidth = slide.offsetWidth;
      const marginRight = index !== slideCount - 1 ? parseInt(style.marginRight, 10) : 0;
      position += slideWidth + marginRight;
    });
  
    const totalSlidesWidth = position;
  
    // slidesPerView: 소수점 반올림으로 정확도 향상
    const averageSlideWidth = totalSlidesWidth / slideCount;
    const slidesPerView = Math.round(containerWidth / averageSlideWidth);
  
    // maxIndex 계산 (최소 0 이상)
    const maxIndex = Math.max(slideCount - slidesPerView, 0);
  
    // totalPages 계산 (최소 1 이상)
    const totalPages = maxIndex > 0 ? maxIndex + 1 : 1;
    lastPageEl.textContent = totalPages;
  
    let currentIndex = 0;
  
    function updateProgressFill(currentPage, totalPages) {
      const progressBarWidth = progressbar.offsetWidth;
      const progressFillWidth = progressFill.offsetWidth;
  
      // progressFill 너비는 progressBar 너비의 약 40%로 고정 (w-[22rem] 기준)
      // progressFill이 이동할 left 범위: 0% ~ 60% (즉 0 ~ 0.6 * progressBarWidth)
  
      const startLeft = 0; // 0%
      const endLeft = progressBarWidth * 0.6; // 60%
  
      // 진행도 비율 (0 ~ 1)
      const progressRatio = currentPage / totalPages;
  
      // left 계산 (0 ~ 60% 사이 이동)
      const leftPos = startLeft + (endLeft - startLeft) * progressRatio;
  
      progressFill.style.left = `${leftPos}px`;
    }
  
    function updateSlidePosition() {
      if (currentIndex < 0) currentIndex = 0;
      if (currentIndex > maxIndex) currentIndex = maxIndex;
  
      const translateX = -slidePositions[currentIndex];
      swiperWrapper.style.transition = 'transform 0.5s ease';
      swiperWrapper.style.transform = `translateX(${translateX}px)`;
  
      // 현재 페이지 번호
      const currentPage = currentIndex + 1;
      currentPageEl.textContent = currentPage;
  
      // progressFill 위치 업데이트
      updateProgressFill(currentPage, totalPages);
  
      // 버튼 상태 토글
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
  });
  