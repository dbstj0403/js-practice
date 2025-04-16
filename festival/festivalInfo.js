import { festivalData } from "../constants/festivalData.js";

const calendar = document.getElementById("calendar");
const display = document.getElementById("display");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const festivalList = document.getElementById("festivalList");
const week = ["일", "월", "화", "수", "목", "금", "토"];

let offset = 0;
let selectedDate = new Date().toDateString();

const renderFestivalList = (selected) => {
  const selectedDay = new Date(selected);
  const events = festivalData.filter(
    (item) => selectedDay >= item.startTime && selectedDay <= item.endTime
  );

  if (events.length === 0) {
    festivalList.innerHTML =
      '<p class="text-gray-600 px-8">해당 날짜에 열리는 행사가 없습니다.</p>';
    return;
  }

  festivalList.innerHTML = events
    .map(
      (event) => `
        <div class="snap-center flex-shrink-0 w-[30rem] h-[18rem] bg-white rounded-lg flex justify-center items-center px-6 shadow-lg">
          <img src="${event.img}" class="w-[7rem] h-[10rem] rounded-md" />
          <div class="flex flex-col gap-y-3 ml-4">
            <h3 class="text-lg font-semibold">${event.title}</h3>
            <p class="text-sm text-gray-700">장소: ${event.space}</p>
            <p class="text-sm text-gray-700">기간: ${event.startTime.toLocaleDateString()} ~ ${event.endTime.toLocaleDateString()}</p>
            <p class="text-sm text-gray-700">주소: ${event.address}</p>
          </div>
        </div>
      `
    )
    .join("");
};

const renderCalendar = () => {
  calendar.innerHTML = "";
  const today = new Date();
  const base = new Date();
  base.setDate(today.getDate() + offset);
  display.textContent = `${base.getFullYear()}.${base.getMonth() + 1}`;

  for (let i = 0; i < 14; i++) {
    const date = new Date(base);
    date.setDate(base.getDate() + i);

    const dayNum = date.getDate();
    const weekday = week[date.getDay()];
    const isSelected = date.toDateString() === selectedDate;

    const box = document.createElement("div");
    box.className =
      "flex flex-col items-center w-14 py-2 rounded-lg cursor-pointer transition " +
      (isSelected
        ? "bg-black text-white font-bold"
        : "bg-gray-100 text-gray-800 hover:bg-gray-200");

    box.innerHTML = `
      <div>${dayNum}</div>
      <div class="text-sm">${weekday}</div>
    `;

    box.addEventListener("click", () => {
      selectedDate = date.toDateString();
      renderCalendar();
      renderFestivalList(selectedDate);
    });

    calendar.appendChild(box);
  }

  renderFestivalList(selectedDate);
};

prevBtn.addEventListener("click", () => {
  offset -= 14;
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  offset += 14;
  renderCalendar();
});

renderCalendar();

// festivalList 드래그 슬라이드
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
  const walk = (x - startX) * 2.0; // 슬라이드 속도
  festivalList.scrollLeft = scrollLeft - walk;
});
