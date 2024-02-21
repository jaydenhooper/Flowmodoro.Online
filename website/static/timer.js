var seconds = 0, minutes = 0, elapsedTime = 0, breakTime = 0;
var mode;
var myInterval;
var timerText = document.getElementById('timeText');
var timeButton = document.getElementById('timeButton');
var timeDiv = document.getElementById('timeDiv');
var notificationText = document.getElementById('notificationText');


/* ****************************************** */
/* ******** Timer Specific Functions ******** */
/* ****************************************** */


function formatTime(deltaSeconds) {
    if (mode === modeEnum.STUDY) {
        totalTimeInSeconds = elapsedTime + Math.floor(deltaSeconds);
        minutes = Math.floor(totalTimeInSeconds / 60);
        seconds = totalTimeInSeconds % 60;
    } else {
        totalTimeInSeconds = breakTime - Math.floor(deltaSeconds);
        minutes = Math.floor(totalTimeInSeconds / 60);
        seconds = totalTimeInSeconds % 60;
        if (minutes <= 0 && seconds <= 0) {
            minutes = 0;
            seconds = 0;
        }
    }
    return minutes.toString().padStart(2, "0") + ":" +
           seconds.toString().padStart(2, "0");
}


function incrementTime(startTime) {
    var delta = Date.now() - startTime;
    deltaSeconds = Math.floor(delta / 1000);
    timerText.innerHTML = formatTime(deltaSeconds);
}


function decrementTime(startTime) {
    if(minutes <= 0 && seconds <= 0) {
        notifyBreakFinished();
        return;
    }
    var delta = Date.now() - startTime;
    deltaSeconds = Math.floor(delta / 1000);
    timerText.innerHTML = formatTime(deltaSeconds);
}


function start() {
    // handle timer
    timeButton.innerHTML = "PAUSE";
    if (mode === modeEnum.STUDY) {
        studyStart();
    } else if (mode === modeEnum.BREAK) {
        breakStart();
    }
}


function pause() {
    elapsedTime = minutes * 60 + seconds;
    breakTime = minutes * 60 + seconds;
    timeButton.innerHTML = "START";
    clearInterval(myInterval);
}


function reset() {
    pause();
    elapsedTime = 0;
    setMode(modeEnum.STUDY);
    currentFunction = start;
    seconds = 0;
    minutes = 0;
    timerText.innerHTML = formatTime(0);
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
    clearNotes();
    if (mode === modeEnum.STUDY) {
        setUpStudy();
    } else if (mode === modeEnum.BREAK) {
        setUpBreak();
    }
}


function clearNotes() {
    notificationText.innerHTML = "";
}


/* ****************************************** */
/* *************** STUDY MODE *************** */
/* ****************************************** */


function studyStart() {
    var startTime = Date.now();
    myInterval = setInterval(incrementTime, 100, startTime);
    document.getElementById("breakButton").style.display="inline";
}


function setUpStudy() {
    timeButton.style.display = 'inline';
    document.getElementById("breakButton").style.display="none";
}


/* ****************************************** */
/* *************** BREAK MODE *************** */
/* ****************************************** */


function breakStart() {
    var startTime = Date.now();
    myInterval = setInterval(decrementTime, 100, startTime);
    var ps = notificationText.getElementsByTagName('p');
    var p = ps[0];
    p.innerHTML = "Enjoy your break! You will be alerted when your break has finished."
}


function setUpBreak() {
    // calculate break time
    var denominator = 3;
    calculateBreakTime(denominator);

    // update time on timerText
    timerText.innerHTML = formatTime(0);  

    // hide break button
    document.getElementById("breakButton").style.display = 'none';

    // add break note
    var p = document.createElement("p");
    p.innerHTML = "Start the break timer when you are ready to go for your break.";
    notificationText.append(p);
}


function goBreak() {
    pause();
    currentFunction = start;
    setMode(modeEnum.BREAK);
}


function calculateBreakTime(denominator) {
    breakTime = Math.ceil((minutes * 60 + seconds) / denominator);
    seconds = 0, minutes = 0;
    minBreakTime = 120; // minimum break time of 2 minutes
    breakTime = Math.max(minBreakTime, breakTime);  
}


function notifyBreakFinished() {
    timeButton.style.display = 'none';
    var ps = notificationText.getElementsByTagName('p');
    var p = ps[0];
    p.innerHTML = "Your break has finished. Please reset the clock."
    clearInterval(myInterval);
    alert("Your break has finished.")
}

