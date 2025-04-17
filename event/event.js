import { eventData } from "../constants/eventData.js";
import { showData } from "../constants/eventData.js";

const today = new Date();
const eventList = document.getElementById("eventList");
const allBtn = document.getElementById("all");
const progressBtn = document.getElementById("progress");
const endBtn = document.getElementById("end");
const showBtn = document.getElementById("show");
const count = document.getElementById("count");

// 상단의 태그가 어디에 선택되어 있는지 관리하기 위한 변수. 4가지 상태가 있으며 클릭시 변해야 하므로 let 선언
let tag = "all";

// festival 페이지와 마찬가지로 정확한 날짜 비교를 위해 시/분/초 제거
const stripTime = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const renderEventList = (today) => {
  const now = stripTime(today);

  // 현재 태그에 따라 필터링된 이벤트 데이터가 저장될 변수. 사용자의 클릭에 따라 변해야 하므로 let 선언
  let events;

  // '전체'로 설정되어 있을 경우 모든 이벤트 데이터가 곧 events가 됨.
  if (tag === "all") {
    events = eventData;
  } else if (tag === "progress") {
    // 진행중 태그 선택시 이벤트 시작/끝 기간 내에 현재 날짜가 있는지 검사하여 필터링함.
    events = eventData.filter((item) => {
      const start = stripTime(item.startTime);
      const end = stripTime(item.endTime);
      return now >= start && now <= end;
    });
  } else if (tag === "end") {
    // 종료 선택시 이벤트 시작/끝 기간 내에 현재 날짜가 없는 경우만 필터링함.
    events = eventData.filter((item) => {
      const end = stripTime(item.endTime);
      return now > end;
    });
    // 당첨자 발표의 경우 이벤트 데이터가 아닌 showData를 보여줌.
  } else if (tag === "show") {
    events = showData;
  }

  if (!events || events.length === 0) {
    eventList.innerHTML = `<p class="text-gray-600 px-8">해당 조건의 이벤트가 없습니다.</p>`;
    return;
  }

  // 해당 태그에 존재하는 이벤트 개수를 카운트하기 위한 분기문. 당첨자 발표의 경우 그냥 showData의 length를, 그외의 경우에는 필터링된 데이터의 length를 렌더링함.
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

// 태그 선택 상태와 getElementById 로 가져온 변수를 매칭하기 위한 객체
const buttonMap = {
  all: allBtn,
  progress: progressBtn,
  end: endBtn,
  show: showBtn,
};

// 버튼이 클릭되면 이전 상태와 현재 눌린 태그 정보를 하단 이벤트 핸들러에 넘겨 기존 버튼의 스타일 변화는 없애고, 새로이 눌린 버튼에 스타일을 변화함.
Object.keys(buttonMap).forEach((key) => {
  buttonMap[key].addEventListener("click", () => {
    const prev = tag;
    tag = key;
    btnClickHandler(prev, tag);
    renderEventList(today);
  });
});

// 버튼 선택시 스타일 변화를 위한 이벤트 핸들러
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
