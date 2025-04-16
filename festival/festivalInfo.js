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
      '<p class="text-gray-600">해당 날짜에 열리는 행사가 없습니다.</p>';
    return;
  }

  festivalList.innerHTML = events
    .map(
      (event) => `
          <div class="py-3 w-[15rem] h-[5rem]">
            <h3 class="text-lg font-semibold">${event.title}</h3>
            <p class="text-sm text-gray-700">장소: ${event.space}</p>
            <p class="text-sm text-gray-700">기간: ${event.startTime.toLocaleDateString()} ~ ${event.endTime.toLocaleDateString()}</p>
            <p class="text-sm text-gray-700">주소: ${event.address}</p>
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
