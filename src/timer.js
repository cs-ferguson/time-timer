function clearEl(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

function createButton(text) {
  let newButton = document.createElement("button");
  newButton.type = "button";
  newButton.append(document.createTextNode(text));
  return newButton;
}

function convertHours(ms) {
  let hours = Math.floor(ms / 3600000);
  let prefix = hours < 10 ? "0" : "";
  return `${prefix}${hours}:${convertMinutes(Math.floor(ms % 3600000))}`;
}

function convertMinutes(ms) {
  let mins = Math.floor(ms / 60000);
  let prefix = mins < 10 ? "0" : "";
  return `${prefix}${mins}:${convertSeconds(Math.floor(ms % 60000))}`;
}

function convertSeconds(ms) {
  let secs = Math.floor(ms / 1000);
  let prefix = secs < 10 ? "0" : "";
  return `${prefix}${secs}`;
}

function convertToTimeFormat(timeRemaining) {
  if (timeRemaining < 1000) {
    return `00:00:00`;
  }
  if (timeRemaining === 1000) {
    return `00:00:01`;
  }
  if (timeRemaining < 60000) {
    return `00:00:${convertSeconds(timeRemaining)}`;
  }
  if (timeRemaining === 60000) {
    return `00:01:00`;
  }
  if (timeRemaining < 3600000) {
    return `00:${convertMinutes(timeRemaining)}`;
  }
  //else
  return `${convertHours(timeRemaining)}`;
}

function timeTimer(container) {
  this.targetContainer = container;
  this.timerInterval = null;
  this.timerContainer = document.createElement("div");
  this.timerStartDuration = null;
  this.clock = null;
  this.timerRunning = null;
  this.timeRemaining = null;
}

timeTimer.prototype.show = function (timeRemaining) {
  this.clock.innerHTML = convertToTimeFormat(timeRemaining);
  this.timeRemaining = timeRemaining;
};

timeTimer.prototype.start = function (duration) {
  console.log("starting");
  clearEl(this.timerContainer);
  this.timerContainer.append(this.createClock());
  let targetTime = Date.now() + duration * 60000;
  const tick = () => {
    let timeRemaining = targetTime - Date.now();
    console.log(timeRemaining);
    if (timeRemaining > 0) {
      this.show(timeRemaining);
      this.timerRunning = true;
    } else {
      this.show(0);
      clearInterval(this.timerInterval);
      this.timerRunning = false;
    }
  };
  this.timerInterval = setInterval(tick, 100);
};

timeTimer.prototype.pause = function () {
  clearInterval(this.timerInterval);
  this.timerRunning = false;
};

timeTimer.prototype.createSetupForm = function (duration) {
  let setupForm = document.createElement("form");
  let durationInput = document.createElement("input");
  durationInput.type = "number";
  durationInput.value = 5;
  durationInput.min = 1;
  durationInput.max = 600;
  durationInput.id = "time-input";
  setupForm.append(durationInput);
  let startButton = document.createElement("button");
  startButton.type = "submit";
  startButton.append(document.createTextNode("Start"));
  setupForm.append(startButton);

  setupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let duration = e.target.elements[0].value;
    this.timerStartDuration = duration;
    console.log(duration);
    this.start(duration);
  });

  return setupForm;
};

timeTimer.prototype.createClock = function () {
  let clock = document.createElement("div");
  let clockDisplay = document.createElement("div");
  this.clock = clockDisplay;

  let pauseButton = createButton("Pause");
  pauseButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(this.timerRunning);
    if (this.timerRunning) {
      this.pause();
    } else {
      console.log(this.timeRemaining);
      this.start(this.timeRemaining / 60000);
    }
  });
  let resetButton = createButton("Reset");

  clock.append(clockDisplay);
  clock.append(pauseButton);
  clock.append(resetButton);

  return clock;
};

timeTimer.prototype.init = function () {
  //clear target container
  clearEl(this.targetContainer);

  let setupForm = this.createSetupForm(60000);
  this.timerContainer.append(setupForm);
  this.targetContainer.append(this.timerContainer);

  let timeInput = setupForm.querySelector("#time-input");
  console.log(timeInput);
  timeInput.select();
};

function init() {
  const timerContainer = document.getElementById("timer-container");
  const Timer = new timeTimer(timerContainer);
  Timer.init();
}

init();
