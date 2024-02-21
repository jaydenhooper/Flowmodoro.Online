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
        return;
    }
    seconds -= 1;
    timerText.innerHTML = formatTime();
}


function start() {
    // handle timer
    timeButton.innerHTML = "PAUSE";
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
    clearNotes();
    if ( mode === modeEnum.STUDY ) {
        setUpStudy();
    } else if ( mode === modeEnum.BREAK ) {
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
    myInterval = setInterval(incrementTime, 1000);
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
    myInterval = setInterval(decrementTime, 1000);
    var ps = notificationText.getElementsByTagName('p');
    var p = ps[0];
    p.innerHTML = "Enjoy your break! You will be alerted when your break has finished."
}


function setUpBreak() {
    // calculate break time
    var denominator = 3;
    calculateBreakTime(denominator);

    // update time on timerText
    timerText.innerHTML = formatTime();  

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
    seconds = Math.ceil((minutes * 60 + seconds) / denominator);
    minutes = 0;
    minBreakTime = 120; // minimum break time of 2 minutes
    seconds = Math.max(minBreakTime, seconds);  
}


function notifyBreakFinished() {
    timeButton.style.display = 'none';
    var ps = notificationText.getElementsByTagName('p');
    var p = ps[0];
    p.innerHTML = "Your break has finished. Please reset the clock."
    clearInterval(myInterval);
    alert("Your break has finished.")
}

