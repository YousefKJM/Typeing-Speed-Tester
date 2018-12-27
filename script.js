const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerRunning = false;


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if(time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60);
  timer[1] = Math.floor((timer[3]/100) - (timer[0]*60));
  timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length);

  if(textEntered == originText) {
      clearInterval(interval);
      testWrapper.style.borderColor = "#429890";
  } else {
      if(textEntered == originTextMatch) {
        testWrapper.style.borderColor = "#65CCf3";
      } else {
        testWrapper.style.borderColor = "#E95D0F";
      }
  }
  console.log(textEntered);
}


// Start the timer:
function start() {
  let textEnterdLength = testArea.value.length;
  if (textEnterdLength === 0 && !timerRunning) {
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
  console.log(textEnterdLength);
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0,0,0,0];
  timerRunning = false;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
  console.log("reset button has been pressed!");
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);

//Of course, if you want to enhance this typing speed tester you can.
//One thing you can do is add a words per minute count. You can find the calculation for it online,
//and you can just grab the time that you calculated, and combine it with the number of words in your test,
//and then you can figure out exactly how fast you're typing.

//You can also count the number of errors the person doing the test makes because every time an error is triggered
//you can just increment a number and then it can display the number of errors

//or you can do something really advanced
// like add an array of different texts so the tester can switch between different texts to test

// or even add a high score board.
