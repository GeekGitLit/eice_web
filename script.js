// 질문 목록과 선택지를 저장한 배열. 각 질문과 관련된 트랙 정보가 포함되어 있음
const questions = [
  {
    question: "당신의 선택은?",
    choices: [
      { text: "나는 중학교 때 직병렬 구조에 대해\n관심이 있었다.", track: "전자" },
      { text: "노이즈 캔슬링의\n원리가 궁금하다.", track: "통신" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "TV 화면에 색깔이\n어떻게 표현되는지 궁금하다.", track: "전자" },
      { text: "무전기의 통신 원리가 궁금하다.", track: "통신" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "나는 광선검을 만들고 싶다.", track: "전자" },
      { text: "인터넷이 어떻게 작동하는지\n궁금해 본 적이 있다.", track: "통신" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "자율주행 자동차의\n원리가 궁금하다.", track: "정보" },
      { text: "비행기 내에서 휴대폰 사용이\n금지되는 이유를 알고 싶다.", track: "통신" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "기계의 자동화 시스템에 대해\n관심있다.", track: "정보" },
      { text: "스마트폰에서 카카오톡이\n전송되는 방식이 궁금하다.", track: "통신" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "영상의 구현 방법이 궁금하다.", track: "정보" },
      { text: "나는 5G보다 더 빠른 속도의\n통신망에 대해 궁금하다.", track: "통신" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "마이크 증폭 시스템이 궁금하다.", track: "전자" },
      { text: "<아이언맨> 속 자비스 같은\nAI 비서를 꿈꾼 적이 있다.", track: "정보" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "전기장이 수학적으로\n어떻게 표현되는지 궁금하다.", track: "전자" },
      { text: "소리가 전자기기에 입력되고,\n다시 출력되는 과정이 궁금하다.", track: "정보" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "형광등의 발광 원리가 궁금하다.", track: "전자" },
      { text: "확률에 기반한\n정보 처리 방식이 궁금하다.", track: "정보" }
    ]
  },
  {
    question: "당신의 선택은?",
    choices: [
      { text: "왜 전자기기는 온도에 영향을 많이 받는지 궁금하다.", track: "전자" },
      { text: "챗GPT의 구동 방식이 궁금하다.", track: "정보" },
      { text: "이동 통신 기술의 원리가 궁금하다.", track: "통신" }
    ]
  }
];

// 트랙별 설명과 이미지 경로를 저장한 객체
const trackDescriptions = {
  "전자": {
    description: "전자공학은 전기와 전자에 관한 원리를 바탕으로 한 다양한 응용 분야를 다루는 학문입니다.",
    image: "path/to/electronics_image.jpg"  // 원하는 이미지 파일 경로
  },
  "정보": {
    description: "정보통신공학은 데이터를 수집, 처리, 전송하는 시스템을 설계하는 학문입니다.",
    image: "path/to/information_image.jpg"  // 원하는 이미지 파일 경로
  },
  "통신": {
    description: "통신공학은 무선 및 유선 통신 기술을 연구하는 학문입니다.",
    image: "path/to/communication_image.jpg"  // 원하는 이미지 파일 경로
  }
};

// 현재 질문 인덱스를 저장하는 변수
let currentQuestionIndex = 0;
let selectedAnswers = Array(questions.length).fill(null); // 사용자가 선택한 답변을 저장하는 배열

// 각 분야에 대한 점수를 저장하는 객체
const scores = {
  "전자": 0,
  "정보": 0,
  "통신": 0
};

const totalScores = {
  "전자": 0,
  "정보": 0,
  "통신": 0
}

// 전체 화면 모드로 전환하는 함수
function toggleFullscreen() {
  // 브라우저가 전체 화면 모드를 지원하는지 확인
  if (!document.fullscreenElement) {
    // 페이지 전체를 전체 화면 모드로 전환
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`전체 화면 모드로 전환할 수 없습니다: ${err.message}`);
    });
  } else {
    // 전체 화면 모드를 해제
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// 'START!' 버튼을 클릭했을 때 게임을 시작하는 함수
function startGame() {
  // 시작 페이지를 숨기고 질문 컨테이너를 보여줌
  document.getElementById('start-page').style.display = 'none';
  document.getElementById('question-container').style.display = 'block';
  document.getElementById('fullscreenButton').style.display = 'none';
  // 첫 번째 질문을 로드
  loadQuestion();
}

// 버튼 클릭 시 전체 화면 모드를 토글
document.getElementById('fullscreenButton').addEventListener('click', toggleFullscreen);

// 첫 페이지에서만 전체 화면 버튼 보이게 설정
window.addEventListener('load', function() {
  const fullscreenButton = document.getElementById('fullscreenButton');

  // 첫 페이지일 때만 버튼 표시
  if (document.getElementById('start-page').style.display !== 'none') {
    fullscreenButton.style.display = 'block';
  } else {
    fullscreenButton.style.display = 'none';
  }
});

// DOM이 완전히 로드된 후에 전체 화면 버튼에 이벤트 리스너를 추가
document.addEventListener('DOMContentLoaded', function () {
  const fullscreenButton = document.getElementById('fullscreenButton');
  if (fullscreenButton) {
    fullscreenButton.addEventListener('click', toggleFullscreen);
  }
});

// 현재 질문을 화면에 표시하는 함수
function loadQuestion() {
  const questionContainer = document.getElementById("question-container");
  const question = questions[currentQuestionIndex];
  const questionText = question && question.question ? question.question : "";

  // 질문 텍스트를 컨테이너에 추가
  questionContainer.innerHTML = `<h2>${questionText}</h2>`;

  // 버튼 컨테이너를 생성
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');

  // 선택지의 개수에 따라 버튼 생성 (2개 또는 3개)
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.innerText = choice.text;
    button.onclick = () => selectAnswer(choice.track, index);
    buttonsContainer.appendChild(button);
  });

  questionContainer.appendChild(buttonsContainer);

  // 이전, 다음 버튼 추가
  const navigationContainer = document.createElement('div');
  navigationContainer.classList.add('navigation-container');

  const prevButton = document.createElement("button");
  prevButton.classList.add('prev-button');
  prevButton.innerText = "이전으로";
  prevButton.onclick = goBack;
  if (currentQuestionIndex === 0) prevButton.disabled = true;
  navigationContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.classList.add('next-button');
  nextButton.innerText = "다음으로";
  nextButton.disabled = selectedAnswers[currentQuestionIndex] === null;
  nextButton.onclick = goToNextQuestion;
  navigationContainer.appendChild(nextButton);

  questionContainer.appendChild(navigationContainer);
}

// 사용자가 선택한 답변에 따라 점수를 증가시키고, 다음 질문으로 바로 넘어가는 함수
function selectAnswer(track, choiceIndex) {
  const previousAnswer = selectedAnswers[currentQuestionIndex];

  if (previousAnswer !== null) {
    const previousTrack = questions[currentQuestionIndex].choices[previousAnswer].track;
    scores[previousTrack] -= 1;  // 이전 선택했던 트랙의 점수를 감소
  }

  scores[track] += 1;  // 새로운 선택한 트랙의 점수를 증가
  selectedAnswers[currentQuestionIndex] = choiceIndex;

  // '다음으로' 버튼을 활성화하고 바로 다음 질문으로 이동
  goToNextQuestion();
}

// '다음으로' 버튼 클릭 시 호출되는 함수
function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

// '이전으로' 버튼 클릭 시 호출되는 함수
function goBack() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function updateTrackScores(track) {
  scores = { ...previousScores };
}

// 최종 점수를 퍼센트로 계산하고 가장 높은 트랙을 보여주는 함수
function showResults() {
  // 총 점수 계산
  const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `<h2>결과</h2>`;

  // 최고 비율의 트랙 찾기
  let topTrack = null;
  let highestPercentage = 0;

  Object.keys(scores).forEach(track => {
    const percentage = (scores[track] / totalScore) * 100;
    if (percentage > highestPercentage) {
      highestPercentage = percentage;
      topTrack = track;
    }
  });

  if (topTrack) {
    totalScores[topTrack] += 1;
    updateSidebar();
  }

  // 대표 트랙을 상단에 표시
  if (topTrack) {
    const topTrackInfo = trackDescriptions[topTrack];
    questionContainer.innerHTML += `
      <h3 id="topTrack">${topTrack} 트랙</h3>
      <img src="${topTrackInfo.image}" alt="${topTrack} 이미지" style="width: 100%; max-width: 300px;">
      <p>${topTrackInfo.description}</p>
    `;
  }

  // 막대 그래프 생성
  let barHTML = '<div class="progress-bar">';
  const keys = Object.keys(scores);

  keys.forEach((area, index) => {
    const percentage = (scores[area] / totalScore) * 100;

    let borderRadiusStyle = '';
    if (index === 0) {
      borderRadiusStyle = 'border-radius: 20px 0 0 20px;';
    } else if (index === keys.length - 1) {
      borderRadiusStyle = 'border-radius: 0 20px 20px 0;';
    }

    const textFits = percentage > 15;

    barHTML += `<div class="bar" style="width: ${percentage}%; background-color: ${getColourForTrack(area)}; ${borderRadiusStyle}">
      ${textFits ? `<span class="bar-text">${area}: ${percentage.toFixed(1)}%</span>` : ''}
    </div>`;
  });

  barHTML += '</div>';
  questionContainer.innerHTML += barHTML;

  let legendHTML = '<div class="legend">';
  keys.forEach((area) => {
    const percentage = (scores[area] / totalScore) * 100;
    if (percentage <= 15) {
      legendHTML += `<p>${area}: ${percentage.toFixed(1)}%</p>`;
    }
  });
  legendHTML += '</div>';

  questionContainer.innerHTML += legendHTML;

  // '처음으로' 버튼 생성
  const restart = document.createElement('button');
  restart.innerText = "처음으로";
  restart.onclick = reset;
  restart.classList.add('restart-button');
  questionContainer.appendChild(restart);
}

function updateSidebar() {
  document.getElementById('elecCount').innerText = `전자 : ${totalScores["전자"]}명`;
  document.getElementById('infoCount').innerText = `정보 : ${totalScores["정보"]}명`;
  document.getElementById('commCount').innerText = `통신 : ${totalScores["통신"]}명`;
}

// 게임을 다시 시작하는 함수
function reset() {
  // 질문 인덱스와 점수 초기화
  currentQuestionIndex = 0;
  scores["전자"] = 0;
  scores["정보"] = 0;
  scores["통신"] = 0;

  selectedAnswers = Array(questions.length).fill(null);

  const nextButton = document.querySelector(".next-button");
  if (nextButton) {
    nextButton.disabled = true;
  }

  // 질문 컨테이너를 숨기고 시작 페이지를 보여줌
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('start-page').style.display = 'block';

  // 다시 첫 페이지로 돌아오면 전체 화면 버튼 다시 보이게 함
  document.getElementById('fullscreenButton').style.display = 'block';
}

// 각 분야에 대한 색상을 반환하는 함수
function getColourForTrack(area) {
  switch (area) {
    case "전자":
      return "#FF0000";  // 전자 분야는 빨강
    case "정보":
      return "#00FF00";  // 정보 분야는 초록
    case "통신":
      return "#0000FF";  // 통신 분야는 파랑
    default:
      return "#CCCCCC";  // 기본값은 회색
  }
}
