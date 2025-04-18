## 🍎 자바스크립트 연습용 클론코딩 과제

- 대한민국 구석구석 사이트 (https://korean.visitkorea.or.kr/main/area.do) 클론 코딩 프로젝트 레포지토리입니다.

## 👥 팀원 소개

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/dbstj0403">
        <img src="https://github.com/dbstj0403.png" width="200" /><br />
        원윤서<br />
        <sub>@dbstj0403</sub>
      </a>
	  <br/>
	  <sub>Navbar, 축제 행사 정보, 이벤트 페이지</sub>
    </td>
    <td align="center">
      <a href="https://github.com/jaehejun">
        <img src="https://github.com/jaehejun.png" width="200" /><br />
        정재희<br />
        <sub>@jaehejun</sub>
      </a>
	  <br/>
	  <sub>Footer, 슬라이더</sub>
    </td>
  </tr>
</table>

## 👾 브랜치 전략

- 기능 통합 -> `main` 브랜치
- 기능별 구현 -> `feature/[기능 이름]`
- 각 기능별 브랜치에서 구현 완료 후 PR로 main 브랜치에 병합합니다.

## 🐒 커밋 규칙

| **Type**   | **설명**                                             |
| ---------- | ---------------------------------------------------- |
| `Feat`     | 새로운 기능을 추가하는 경우                          |
| `Fix`      | 버그를 고친 경우                                     |
| `Docs`     | 문서를 수정한 경우                                   |
| `Style`    | 코드 포맷 변경, 세미콜론 누락, 코드 수정이 없는 경우 |
| `Refactor` | 코드 리팩토링                                        |
| `Chore`    | 빌드 업무 수정, 패키지 매니저 수정                   |
| `Design`   | CSS 등 UI 디자인을 변경했을 때                       |
| `Rename`   | 파일명 또는 폴더명 수정                              |
| `Remove`   | 코드 삭제가 있을 때 (Clean, Eliminate 사용하기도)    |
| `!HOTFIX`  | 급하게 치명적인 버그를 고쳐야 하는 경우              |

## 🧶 폴더 구조

```
.
├── README.md
├── constants
│   ├── eventData.js
│   └── festivalData.js
├── event
│   ├── event.html
│   └── event.js
├── eventSlider
│   ├── eventSlider.html
│   └── eventSlider.js
├── festival
│   ├── draggable.js
│   ├── festivalInfo.html
│   └── festivalInfo.js
├── img
│   ├── event
│   ├── eventSlider
│   ├── festival
│   ├── footer
│   └── navBar
├── index.css
├── index.html
└── layouts
    ├── footer.html
    ├── footer.js
    └── navBar.html
```
