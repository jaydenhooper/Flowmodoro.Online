var startTime, endTime;
var timerText;

function start() {
    startTime = new Date();
    timeButton.innerHTML = "End Timer"
}

function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; // in ms
    timeDiff /= 1000; // convert to seconds
    var seconds = Math.round(timeDiff);
    timeButton.innerHTML = "Start Timer"
    console.log(seconds);
}

let currentFunction = start;

function toggleFunctions() {
    if (currentFunction === start) {
        currentFunction = end;
    } else {
        currentFunction = start;
    }
}

document.getElementById('timeButton').addEventListener('click', function() {
    currentFunction();
    toggleFunctions();
});