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
// console.log(chanceAreaNum.textContent) 에관해 찾아볼것

let randomNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input"); // input 에 입력한 값을 반환하면 문자열로 반환된다 ex) 100 , "99" 
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-area");
let chanceAreaNum = document.querySelector("#chance-area .red-txt");
let chanceNum = 5;
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function() {
    userInput.value = "";
})

function answerNum() {
    randomNum = (Math.floor(Math.random() * 100)) + 1;
    console.log(`정답 : ${randomNum}`);
}

function play() {
    let userInputVal = userInput.value;

    if (userInputVal == "") {
        return;
    }

    if (userInputVal < 1 || userInputVal > 100) {
        resultArea.textContent = "범위밖입니다";
        return;
    }

    if (history.includes(userInputVal)) {
        resultArea.textContent = "이미 입력했던 숫자입니다.";
        return;
    }

    history.push(userInputVal);
    
    
    
    if (userInputVal > randomNum) {
        resultArea.textContent = "Down";

        for (let i =0; i < history.length; i++) {
            if (history[i] < userInputVal && history[i] > randomNum) {
                resultArea.textContent = "입력하신 숫자보다 커요";
                return;
            }
        }
        
        

    } else if (userInputVal < randomNum) {
        resultArea.textContent = "Up"; 
        // return;

        for (let i =0; i < history.length; i++) {
            if (history[i] > userInputVal && history[i] < randomNum) {
                resultArea.textContent = "입력하신 숫자보다 작아요";
                return;
            }
        }

    } else {
        resultArea.textContent = "정답";
        playButton.disabled = true;
    }
    chanceNum--;
    chanceAreaNum.textContent = `${chanceNum}번`;

    if (chanceNum < 1) {
        playButton.disabled = true;
        return;
    }
}

function reset() {
    answerNum();
    userInput.value = "";
    playButton.disabled = false;
    resultArea.textContent = "1부터 100 사이의 숫자를 입력 해주세요";
    chanceNum = 5;
    chanceAreaNum.textContent = `${chanceNum}번`;
    history = [];
}
answerNum();