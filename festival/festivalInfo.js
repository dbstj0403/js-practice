import { festivalData } from "../constants/festivalData.js";

const calendar = document.getElementById("calendar");
const display = document.getElementById("display");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const festivalList = document.getElementById("festivalList");
const indicatorContainer = document.getElementById("indicator");
const week = ["일", "월", "화", "수", "목", "금", "토"];

let offset = 0;
let selectedDate = new Date().toDateString(); // 처음 화면에 들어올 때 선택된 날짜는 현재 날짜와 같음.

let visibleCardCount = 0; // 인디케이터 dot 개수
let currentIndex = 0; // 현재 활성 dot

// 카드의 가로 너비 (현재 카드 1개의 너비는 40rem으로 설정하고 있는데, index.css의 미디어 쿼리를 보면 데스크탑 사이즈의 폰트 사이즈는 16px이므로 16 * 40 = 640)
const CARD_WIDTH_PX = 640;

// 카드 사이의 갭 너비 (마찬가지로 16 * 2) (html에서 gap-[2rem]으로 설정하였으므로)
const CARD_GAP_PX = 32;

// 카드 너비 + 갭 너비
const FULL_WIDTH = CARD_WIDTH_PX + CARD_GAP_PX;

const renderFestivalList = (selected) => {
  // 날짜 비교시 일반 비교 연산자로 비교할 경우 시간까지 비교하게 되어 정확한 날짜 비교가 불가능하므로, 날짜만 뽑아서 비교하기 위한 함수.
  const stripTime = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const selectedDay = stripTime(new Date(selected));

  // 시작 날짜 ~ 끝나는 날짜 안에 선택된 날짜가 있으면 filter 통과
  const events = festivalData.filter((item) => {
    const start = stripTime(item.startTime);
    const end = stripTime(item.endTime);
    return selectedDay >= start && selectedDay <= end;
  });

  // 만약 해당 날짜에 어떠한 행사도 진행되지 않을 경우 렌더링
  if (events.length === 0) {
    festivalList.innerHTML =
      '<div class="text-white px-8">해당 날짜에 열리는 행사가 없습니다.</div>';
    visibleCardCount = 0;
    indicatorContainer.innerHTML = "";
    return;
  }

  // 가운데 정렬을 맞추기 위한 더미 카드 내용 X, 이벤트 X
  festivalList.innerHTML = [
    // 맨 앞 더미 카드
    `<div class="w-[40rem] h-[22rem] flex-shrink-0 bg-transparent pointer-events-none select-none"></div>`,

    // 실제 카드들
    ...events.map((event) => {
      return `
        <div class="snap-center flex-shrink-0 w-[40rem] h-[22rem] bg-white rounded-xl shadow-md flex items-center px-6 py-4 select-none">
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

  // 필터링된 카드 개수만큼 인디케이터 dot을 생성해야 하므로 이를 계산해 줌.
  visibleCardCount = events.length;
  currentIndex = 0;
  renderIndicator();
};

const renderCalendar = () => {
  calendar.innerHTML = "";
  const today = new Date();

  // 처음 화면에 들어왔을 때 베이스 날짜는 현재 날짜와 동일함.
  const base = new Date();
  // 달력 상단의 prev, next 버튼을 누를 경우 offset 전역 변수가 -14, +14 로 변하는데 이를 현재 날짜 기준으로 더하고 빼서 새로운 베이스 날짜로 지정함.
  base.setDate(today.getDate() + offset);

  // getMonth() 함수의 경우 월을 0 ~ 11로 표현하므로 + 1
  display.textContent = `${base.getFullYear()}.${base.getMonth() + 1}`;

  // 베이스 날짜로부터 14번 반복하며 연속되는 날짜를 출력함.
  for (let i = 0; i < 14; i++) {
    const date = new Date(base);
    date.setDate(base.getDate() + i);

    const dayNum = date.getDate();
    const dayIndex = date.getDay();

    // 요일 배열에서 매치되는 요일 찾아 설정
    const weekday = week[dayIndex];

    // 선택된 날짜 하이라이팅을 위한 변수
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
          ? "bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
          : `rounded-full w-8 h-8 flex items-center justify-center font-semibold ${textColor}`
      }">${dayNum}</div>
      <div class="mt-1 text-sm ${textColor}">${weekday}</div>
    `;

    // 날짜가 선택될 때마다 선택된 날짜 업데이트 및 달력, 행사 정보 리스트를 다시 렌더링함.
    box.addEventListener("click", () => {
      selectedDate = date.toDateString();
      renderCalendar();
      renderFestivalList(selectedDate);
    });

    calendar.appendChild(box);
  }

  renderFestivalList(selectedDate);
};

const renderIndicator = () => {
  indicatorContainer.innerHTML = "";

  for (let i = 0; i < visibleCardCount; i++) {
    const dot = document.createElement("button");
    dot.className =
      i === currentIndex
        ? "w-7 h-3 rounded-full bg-white transition-all duration-300" // 선택된 카드 인덱스 인디케이터의 경우 가로로 좀 더 긴 스타일로 보이게끔 함.
        : "w-3 h-3 rounded-full border border-white";

    dot.addEventListener("click", () => {
      const cardWidth = CARD_WIDTH_PX + CARD_GAP_PX;
      // 인디케이터 점들을 생성할 때 부여된 i값을 기반으로, 더미카드 넘기고 난 인덱스만큼 (카드, 갭 너비)를 더한 만큼 스크롤을 옆으로 넘겨줌.
      const scrollTarget = (i + 1) * cardWidth;
      // 계산된 만큼 행사정보 리스트 스크롤을 움직임.
      festivalList.scrollTo({ left: scrollTarget, behavior: "smooth" });
    });

    indicatorContainer.appendChild(dot);
  }
};

festivalList.addEventListener("scroll", () => {
  const scrollLeft = festivalList.scrollLeft;
  const cardWidth = FULL_WIDTH;
  // 스크롤 된 만큼을 카드 + 갭 너비 합으로 나눠주고, 더미 카드를 제외하기 위해 -1
  const index = Math.round(scrollLeft / cardWidth) - 1;

  // 그렇게 계산한 인덱스가 현재 인덱스가 아니고, 인덱스가 0보다 크며 현재 카드 개수보다 작으면 현재 인덱스 값을 계산한 값으로 지정함.
  if (index !== currentIndex && index >= 0 && index < visibleCardCount) {
    currentIndex = index;
    // 인덱스가 바뀌었으므로 리렌더링 필요
    renderIndicator();
  }
});

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
