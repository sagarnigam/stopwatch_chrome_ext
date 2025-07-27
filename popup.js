import {
  stopwatchesContainer,
  addStopwatchBtn,
  nameInput,
  noStopwatchesMessage,
  timersContainer,
  noTimersMessage,
  timerMinutesInput,
  timerSecondsInput,
  addTimerBtn,
} from "./ui.js";
import { createStopwatch } from "./stopwatch.js";
import { updateAddStopwatchState, showLimitMessage, updateAddTimerState, showTimerLimitMessage } from "./state.js";
import { initNavigation } from "./navigation.js";
import { createTimer } from "./timer.js";

document.addEventListener("DOMContentLoaded", function () {
  let addingStopwatch = false;

  initNavigation();

  addStopwatchBtn.addEventListener("click", function () {
    if (stopwatchesContainer.children.length >= 3) {
      showLimitMessage();
      return;
    }
    if (!addingStopwatch) {
      // First click: show input and focus
      nameInput.style.display = "block";
      nameInput.focus();
      noStopwatchesMessage.style.display = "none";
      addingStopwatch = true;
      return;
    }
    // Second click: add stopwatch
    createStopwatch();
    stopwatchesContainer.style.display = "block";
    addStopwatchBtn.style.display = "inline-block";
    noStopwatchesMessage.style.display = "none";
    addStopwatchBtn.style.margin = "";
    addStopwatchBtn.style.position = "";
    nameInput.value = "";
    nameInput.style.display = "none";
    addingStopwatch = false;
  });

  nameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addStopwatchBtn.click();
    }
  });

  // On load, hide input
  nameInput.style.display = "none";

  // Add the first stopwatch by default
  noStopwatchesMessage.style.display = "block";
  stopwatchesContainer.style.display = "none";
  addStopwatchBtn.style.display = "block";
  addStopwatchBtn.style.margin = "32px auto 0 auto";
  addStopwatchBtn.style.position = "relative";
  updateAddStopwatchState();

  // Timer logic
  
  addTimerBtn.addEventListener("click", function () {
    if (timersContainer.children.length >= 3) {
      showTimerLimitMessage();
      return;
    }
    timerMinutesInput.style.display = "inline-block";
    timerSecondsInput.style.display = "inline-block";
    timerMinutesInput.focus();
    noTimersMessage.style.display = "none";
  });

  function tryCreateTimer() {
    let minutes = parseInt(timerMinutesInput.value, 10) || 0;
    let seconds = parseInt(timerSecondsInput.value, 10) || 0;
    if (minutes === 0 && seconds === 0) {
      // Don't add a timer with 0:00
      return;
    }
    createTimer(minutes, seconds);
    timersContainer.style.display = "block";
    noTimersMessage.style.display = "none";
    timerMinutesInput.value = "";
    timerSecondsInput.value = "";
    timerMinutesInput.style.display = "none";
    timerSecondsInput.style.display = "none";
    updateAddTimerState();
  }

  timerMinutesInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      tryCreateTimer();
    }
  });
  
  timerSecondsInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      tryCreateTimer();
    }
  });
  // On load, hide timer inputs and create button
  timerMinutesInput.style.display = "none";
  timerSecondsInput.style.display = "none";
  noTimersMessage.style.display = "block";
  timersContainer.style.display = "none";
  updateAddTimerState();
});
