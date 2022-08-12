   // Inline timer in  card code

   function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        total: t,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown1', deadline);
        }

        daysSpan.innerHTML = ("0" + t.days + " :");
        hoursSpan.innerHTML = ("0" + t.hours + " :").slice(-4);
        minutesSpan.innerHTML = ("0" + t.minutes + " :").slice(-4);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}


var deadline = new Date(Date.parse(new Date()) + 1000 * 2000);
initializeClock("countdown1", deadline);


// ============================================================================Countdown2================================

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown2', deadline);
        }

        daysSpan.innerHTML = ("0" + t.days + " :");
        hoursSpan.innerHTML = ("0" + t.hours + " :").slice(-4);
        minutesSpan.innerHTML = ("0" + t.minutes + " :").slice(-4);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 2000 * 2000);
initializeClock("countdown2", deadline);


// ============================================================================Countdown3================================

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown3', deadline);
        }

        daysSpan.innerHTML = ("0" + t.days + " :");
        hoursSpan.innerHTML = ("0" + t.hours + " :").slice(-4);
        minutesSpan.innerHTML = ("0" + t.minutes + " :").slice(-4);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 2000 * 3000);
initializeClock("countdown3", deadline);



// ============================================================================Countdown4================================

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown4', deadline);
        }

        daysSpan.innerHTML = ("0" + t.days + " :");
        hoursSpan.innerHTML = ("0" + t.hours + " :").slice(-4);
        minutesSpan.innerHTML = ("0" + t.minutes + " :").slice(-4);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 500 * 200);
initializeClock("countdown4", deadline);



// ============================================================================Countdown5================================

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown5', deadline);
        }

        daysSpan.innerHTML = ("0" + t.days + " :");
        hoursSpan.innerHTML = ("0" + t.hours + " :").slice(-4);
        minutesSpan.innerHTML = ("0" + t.minutes + " :").slice(-4);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 11000 * 21000);
initializeClock("countdown5", deadline);



// ============================================================================Countdown6================================

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown6', deadline);
        }

        daysSpan.innerHTML = ("0" + t.days + " :");
        hoursSpan.innerHTML = ("0" + t.hours + " :").slice(-4);
        minutesSpan.innerHTML = ("0" + t.minutes + " :").slice(-4);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 9000 * 3000);
initializeClock("countdown6", deadline);





// ============================================================================Countdown7================================

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown7', deadline);
        }

        daysSpan.innerHTML = ("0" + t.days + " :");
        hoursSpan.innerHTML = ("0" + t.hours + " :").slice(-4);
        minutesSpan.innerHTML = ("0" + t.minutes + " :").slice(-4);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 3000 * 7000);
initializeClock("countdown7", deadline);





// ============================================================================Countdown8================================

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown8', deadline);
        }

        daysSpan.innerHTML = ("0" + t.days + " :");
        hoursSpan.innerHTML = ("0" + t.hours + " :").slice(-4);
        minutesSpan.innerHTML = ("0" + t.minutes + " :").slice(-4);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 22000 * 100);
initializeClock("countdown8", deadline);

