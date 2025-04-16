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
  const stripTime = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const selectedDay = stripTime(new Date(selected));
  const events = festivalData.filter((item) => {
    const start = stripTime(item.startTime);
    const end = stripTime(item.endTime);
    return selectedDay >= start && selectedDay <= end;
  });

  if (events.length === 0) {
    festivalList.innerHTML =
      '<p class="text-gray-600 px-8">해당 날짜에 열리는 행사가 없습니다.</p>';
    return;
  }

  festivalList.innerHTML = events
    .map(
      (event) => `
        <div class="snap-center flex-shrink-0 justify-between w-[32rem] h-[18rem] bg-white rounded-lg flex justify-center px-6 shadow-lg pt-[2.5rem] select-none">
          <img src="${
            event.img
          }" class="w-[9em] h-[13rem] rounded-md" draggable="false"/>
          <div class="flex flex-col gap-y-3 ml-4 w-[18rem] h-[7rem]">
            <h3 class="text-2xl font-semibold">${event.title}</h3>
            <p class="text-md text-gray-700">${event.space}</p>
            <div class="flex mt-[1.3rem]">
              <p class="text-sm text-gray-700 w-[8rem]">기간 <br/> ${event.startTime.toLocaleDateString()} ~ ${event.endTime.toLocaleDateString()}</p>
              <p class="text-sm text-gray-700">주소 <br/> ${event.address}</p>
            </div>
            <div class="flex gap-[2rem]">
              <button class="rounded-md w-[6rem] bg-black text-white p-[0.5rem] text-sm">바로가기</button>
              <button class="rounded-md w-[6rem] bg-white border border-black p-[0.5rem] text-sm">길찾기</button>
            </div>
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
    const dayIndex = date.getDay();
    const weekday = week[dayIndex];
    const isSelected = date.toDateString() === selectedDate;

    // 요일 색상 설정
    let textColor = "text-gray-800";
    if (dayIndex === 0) textColor = "text-red-500";
    else if (dayIndex === 6) textColor = "text-blue-500";

    const box = document.createElement("div");
    box.className =
      "flex flex-col items-center w-14 py-2 cursor-pointer transition";

    box.innerHTML = `
      <div class="${
        isSelected
          ? `bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold`
          : `rounded-full w-8 h-8 flex items-center justify-center font-semibold ${textColor}`
      }">${dayNum}</div>
      <div class="mt-1 text-sm ${textColor}">${weekday}</div>
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
  const base = new Date();
  base.setDate(new Date().getDate() + offset);
  selectedDate = base.toDateString();
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  offset += 14;
  const base = new Date();
  base.setDate(new Date().getDate() + offset);
  selectedDate = base.toDateString();
  renderCalendar();
});

renderCalendar();
