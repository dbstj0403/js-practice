const calendar = document.getElementById("calendar");
const monthDisplay = document.getElementById("monthDisplay");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const week = ["일", "월", "화", "수", "목", "금", "토"];

let offset = 0;

// 선택한 날짜를 관리하는 전역 변수
let selectedDate = new Date().toDateString();

const renderCalendar = () => {
  calendar.innerHTML = "";

  const today = new Date();
  const base = new Date();

  // 처음에는 현재 날짜로 베이스 세팅
  base.setDate(today.getDate() + offset);

  // getMonth() : 0 ~ 11 을 반환하기 때문에 + 1 필수
  monthDisplay.textContent = `${base.getFullYear()}.${base.getMonth() + 1}`;

  // base 날짜로부터 총 14일씩을 보여줘야 하므로 반복문을 통해 요소를 생성
  for (let i = 0; i < 14; i++) {
    const date = new Date(base);
    date.setDate(base.getDate() + i);

    // 일자 추출
    const dayNum = date.getDate();

    // 요일 추출
    const weekday = week[date.getDay()];

    // 선택되었는지 확인하는 함수
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
    });

    calendar.appendChild(box);
  }
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
