import { eventData } from "../constants/eventData.js";
import { showData } from "../constants/eventData.js"; // show 전용 데이터 불러오기

const today = new Date();
const eventList = document.getElementById("eventList");
const allBtn = document.getElementById("all");
const progressBtn = document.getElementById("progress");
const endBtn = document.getElementById("end");
const showBtn = document.getElementById("show");

let tag = "all";

// 시분초 제거용
const stripTime = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const renderEventList = (today) => {
  const now = stripTime(today);

  let events;

  if (tag === "all") {
    events = eventData;
  } else if (tag === "progress") {
    events = eventData.filter((item) => {
      const start = stripTime(item.startTime);
      const end = stripTime(item.endTime);
      return now >= start && now <= end;
    });
  } else if (tag === "end") {
    events = eventData.filter((item) => {
      const end = stripTime(item.endTime);
      return now > end;
    });
  } else if (tag === "show") {
    events = showData; // 별도 데이터 사용
  }

  if (!events || events.length === 0) {
    eventList.innerHTML = `<p class="text-gray-600 px-8">해당 조건의 이벤트가 없습니다.</p>`;
    return;
  }

  eventList.innerHTML = events
    .map(
      (event) => `
        <div class="snap-center flex-shrink-0 justify-between w-[32rem] h-[18rem] bg-white rounded-lg flex justify-center px-6 shadow-lg pt-[2.5rem] select-none">
          <img src="${
            event.img
          }" class="w-[9em] h-[13rem] rounded-md" draggable="false"/>
          <div class="flex flex-col gap-y-3 ml-4 w-[18rem] h-[7rem]">
            <h3 class="text-2xl font-semibold">${event.title}</h3>
            <div class="flex mt-[1.3rem]">
              <p class="text-sm text-gray-700 w-[8rem]">기간 <br/> 
                ${event.startTime.toLocaleDateString()} ~ ${event.endTime.toLocaleDateString()}
              </p>
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

renderEventList(today);

// ✅ 버튼 이벤트
allBtn.addEventListener("click", () => {
  tag = "all";
  renderEventList(today);
});

progressBtn.addEventListener("click", () => {
  tag = "progress";
  renderEventList(today);
});

endBtn.addEventListener("click", () => {
  tag = "end";
  renderEventList(today);
});

showBtn.addEventListener("click", () => {
  tag = "show";
  renderEventList(today);
});
