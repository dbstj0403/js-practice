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

  festivalList.innerHTML = [
    // 맨 앞 더미 카드
    `<div class="w-[45rem] h-[18rem] flex-shrink-0 bg-transparent pointer-events-none select-none"></div>`,

    // 실제 카드들
    ...events.map((event) => {
      return `
        <div class="snap-center flex-shrink-0 w-[40rem] h-[18rem] bg-white rounded-xl shadow-md flex items-center px-6 py-4 select-none">
          <!-- 좌측 이미지 -->
          <div class="w-[13rem] h-[14rem] flex items-center justify-center">
            <img
              src="${event.img}"
              alt="${event.title} 이미지"
              class="w-full h-full object-cover rounded-md"
              draggable="false"
            />
          </div>
  
          <!-- 중앙 점선 -->
          <div class="w-px h-[80%] border-r border-dashed border-gray-300 mx-6"></div>
  
          <!-- 우측 텍스트 -->
          <div class="flex flex-col justify-between h-[15rem] w-full">
            <div>
              <h2 class="text-2xl font-bold text-gray-900 mb-1">${
                event.title
              }</h2>
              <p class="text-sm text-gray-600 mb-4">${event.space}</p>
  
              <div class="flex text-sm text-gray-800 gap-12 mt-10">
                <div>
                  <p class="font-semibold text-gray-500 mb-1">기간</p>
                  <p>${event.startTime.toLocaleDateString()} ~ ${event.endTime.toLocaleDateString()}</p>
                </div>
                <div>
                  <p class="font-semibold text-gray-500 mb-1">장소</p>
                  <p class="w-[16rem] leading-snug">${event.address}</p>
                </div>
              </div>
            </div>
  
            <div class="flex gap-4 mt-3">
              <button class="bg-black text-white px-5 py-1.5 rounded text-sm w-[8rem]">바로가기</button>
              <button class="border border-black px-5 py-1.5 rounded text-sm w-[8rem]">길찾기</button>
            </div>
          </div>
        </div>
      `;
    }),

    // 맨 끝 더미 카드
    `<div class="w-[45rem] h-[18rem] flex-shrink-0 bg-transparent pointer-events-none select-none"></div>`,
  ].join("");
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
