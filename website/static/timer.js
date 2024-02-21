var seconds = 0, minutes = 0;
var mode;
var myInterval;
var timerText = document.getElementById('timeText');
var timeButton = document.getElementById('timeButton');
var timeDiv = document.getElementById('timeDiv');
var notificationText = document.getElementById('notificationText');


/* ****************************************** */
/* ******** Timer Specific Functions ******** */
/* ****************************************** */


function formatTime() {
    if (seconds >= 60) {
        minutes += Math.floor(seconds / 60);
        seconds %= 60;
    }
    if (seconds < 0) {
        minutes -= 1;
        seconds = 59;
    }
    if (minutes <= 0 && seconds <= 0) {
        minutes = 0;
        seconds = 0;
    }
    return minutes.toString().padStart(2, "0") + ":" +
        seconds.toString().padStart(2, "0");
}


function incrementTime() {
    seconds += 1;
    timerText.innerHTML = formatTime();
}


function decrementTime() {
    if(minutes <= 0 && seconds <= 0) {
        notifyBreakFinished();
    }
    seconds -= 1;
    timerText.innerHTML = formatTime();
}


function start() {
    // handle timer
    timeButton.innerHTML = "PAUSE";

    // increment timer for study mode, decrement for break mode
    console.log(mode);
    if ( mode === modeEnum.STUDY) {
        studyStart();
    } else if ( mode === modeEnum.BREAK) {
        breakStart();
    }
}


function pause() {
    timeButton.innerHTML = "START";
    clearInterval(myInterval);
}


function reset() {
    pause();
    setMode(modeEnum.STUDY);
    currentFunction = start;
    seconds = 0;
    minutes = 0;
    timerText.innerHTML = formatTime();
}


var currentFunction = start;


function toggleFunctions() {
    if (currentFunction === start) {
        currentFunction = pause;
    }
    else {
        currentFunction = start;
    }
}


timeButton.addEventListener('click', function () {
    currentFunction();
    toggleFunctions();
});



/* ****************************************** */
/* ************** MODE HANDLING ************* */
/* ****************************************** */


var modeEnum = Object.freeze({
    STUDY: 0,
    BREAK: 1
})

mode = modeEnum.STUDY;

function setMode(mode_enum) {
    mode = mode_enum
    if ( mode === modeEnum.STUDY ) {
        readyStudy();
    } else if ( mode === modeEnum.BREAK ) {
        readyBreak();
    }
}


function readyStudy() {
    // clear any break notes

    // set any study notes
}


function readyBreak() {
    // clear any study notes

    // set any break notes
}

/* ****************************************** */
/* *************** STUDY MODE *************** */
/* ****************************************** */


function studyStart() {
    myInterval = setInterval(incrementTime, 1000);
    document.getElementById("breakButton").style.display="inline"
}


/* ****************************************** */
/* *************** BREAK MODE *************** */
/* ****************************************** */


function breakStart() {
    myInterval = setInterval(decrementTime, 1000);
}


function goBreak() {
    pause();

    // switch to break mode
    setMode(modeEnum.BREAK);

    // calculate break time
    var denominator = 3;
    calculateBreakTime(denominator);

    // update time on timerText
    timerText.innerHTML = formatTime();  

    // notify user that this is the length of time for their break
    notifyBreak();

    // hide break button
    var breakButton = document.getElementById("breakButton");
    breakButton.style.display = 'none';
}


function notifyBreak() {
    var p = document.createElement("p");
    p.innerHTML = "Start the break timer when you are ready to go for your break.";
    notificationText.append(p);
}


function calculateBreakTime(denominator) {
    seconds = Math.ceil((minutes * 60 + seconds) / denominator);
    minutes = 0;
    minBreakTime = 120;
    seconds = Math.max(minBreakTime, seconds);  // minimum break time of 2 minutes
}


function notifyBreakFinished() {
    clearInterval(myInterval);
    alert("Your break has finished.")
}


