let isDragging = false;
let startX;
let scrollLeft;

festivalList.addEventListener("mousedown", (e) => {
  isDragging = true;
  festivalList.classList.add("cursor-grabbing");
  startX = e.pageX - festivalList.offsetLeft;
  scrollLeft = festivalList.scrollLeft;
});

festivalList.addEventListener("mouseleave", () => {
  isDragging = false;
  festivalList.classList.remove("cursor-grabbing");
});

festivalList.addEventListener("mouseup", () => {
  isDragging = false;
  festivalList.classList.remove("cursor-grabbing");
});

festivalList.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - festivalList.offsetLeft;
  const walk = (x - startX) * 2.0;
  festivalList.scrollLeft = scrollLeft - walk;
});
