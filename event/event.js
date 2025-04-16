import { eventData } from "../constants/eventData.js";
import { showData } from "../constants/eventData.js";

const today = new Date();
const eventList = document.getElementById("eventList");
const allBtn = document.getElementById("all");
const progressBtn = document.getElementById("progress");
const endBtn = document.getElementById("end");
const showBtn = document.getElementById("show");
const count = document.getElementById("count");

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
    events = showData;
  }

  if (!events || events.length === 0) {
    eventList.innerHTML = `<p class="text-gray-600 px-8">해당 조건의 이벤트가 없습니다.</p>`;
    return;
  }

  if (tag === "show") {
    count.innerText = `총 ${showData.length} 건`;
  } else {
    count.innerText = `총 ${events.length} 건`;
  }

  eventList.innerHTML = events
    .map((event) => {
      const now = stripTime(new Date());
      const isBeforeStart = now < stripTime(event.startTime);
      const isAfterEnd = now > stripTime(event.endTime);

      // 상태에 따라 텍스트와 색상 지정
      let statusText = "진행중";
      let statusColor = "bg-red-500";

      if (isBeforeStart) {
        statusText = "예정";
        statusColor = "bg-gray-400";
      } else if (isAfterEnd) {
        statusText = "종료";
        statusColor = "bg-gray-600";
      }

      // show 태그일 경우엔 무조건 "당첨자 발표"
      if (tag === "show") {
        statusText = "당첨자 발표";
        statusColor = "bg-black";
      }

      return `
      <div class="w-[40rem] m-[1rem] bg-white rounded-lg shadow-md p-4 flex flex-col gap-2 select-none">
        <div class="flex flex-col gap-1">
          <span class="${statusColor} text-white text-xs font-semibold px-2 py-1 rounded w-fit">
            ${statusText}
          </span>
          <h3 class="text-lg font-bold text-black">
            ${event.title}
          </h3>
          <p class="text-sm text-gray-500">
            ${event.startTime.toLocaleDateString()} ~ ${event.endTime.toLocaleDateString()}
          </p>
        </div>
        <img src="${
          event.img
        }" alt="이벤트 이미지" class="w-full rounded-md mt-2" draggable="false"/>
      </div>
    `;
    })
    .join("");
};

renderEventList(today);

const buttonMap = {
  all: allBtn,
  progress: progressBtn,
  end: endBtn,
  show: showBtn,
};

Object.keys(buttonMap).forEach((key) => {
  buttonMap[key].addEventListener("click", () => {
    const prev = tag;
    tag = key;
    btnClickHandler(prev, tag);
    renderEventList(today);
  });
});

const btnClickHandler = (prev, current) => {
  if (buttonMap[prev]) {
    buttonMap[prev].classList.remove("text-white", "bg-black");
    buttonMap[prev].classList.add("text-black", "bg-white");
  }
  if (buttonMap[current]) {
    buttonMap[current].classList.remove("text-black", "bg-white");
    buttonMap[current].classList.add("text-white", "bg-black");
  }
};
