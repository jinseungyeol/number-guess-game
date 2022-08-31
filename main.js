// 로직 
// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력, 그리고 go 라는 버튼을 누름
// 3. 만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다!
// 3-1. 랜덤번호가 < 유저번호 Down!!
// 3-2. 랜덤번호가 > 유저번호 Up!!
// reset 버튼을 누르면 게임이 리셋
// 5번의 기회를 다 쓰면 게임이 끝난다. ( 버튼 disable 됨)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깎지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let chances = 5;
let gameOver = false;
let history = [];

playButton.addEventListener("click", play); //play 다음 () 생략 = 바로 실행돼버려서
userInput.addEventListener("focus", function() {
    userInput.value = "";
})
resetButton.addEventListener("click", reset);

function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;  // 0부터 1사이의 숫자 랜덤 반환 * 100 하면 99가 최대라 +1 해줌
    console.log("정답", computerNum);
}

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이 숫자를 입력해 주세요"
        return; // chances 기회를 깎지 않기 위해
    }

    if (history.includes(userValue)) {
        resultArea.textContent ="이미 입력한 숫자입니다. 다른 값을 입력해주세요";
        return;
    }

    chances--;
    chanceArea.textContent = `남은 찬스: ${chances}번`
    console.log(chances);

    if (userValue < computerNum) {
        resultArea.textContent = "Up!!!"
    } else if (userValue > computerNum) {
        resultArea.textContent = "Down!!!"
    } else {
        resultArea.textContent = "정답입니다"
        gameOver = true;
    }

    history.push(userValue);
    console.log(history) 

    if (chances < 1) {
        gameOver = true;
    }
    
    if (gameOver == true) {
        playButton.disabled = true;
    }
}

function reset() {
    // user input 창이 정리
    // 새로운 정답번호 생성
    userInput.value = "";
    pickRandomNum();
    resultArea.textContent = "결과가 나온다";
    playButton.disabled = false;
}
pickRandomNum();


