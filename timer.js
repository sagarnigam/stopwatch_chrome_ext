/**
 * Timer Module (Functional)
 * Handles all timer-related functionality including creation, controls, and state management using plain functions
 */

import { timersContainer, noTimersMessage, addTimerBtn } from "./ui.js";

/**
 * Creates a new timer with all necessary UI elements and functionality
 * @param {number} minutes - Initial minutes for the timer
 * @param {number} seconds - Initial seconds for the timer
 */
export function createTimer(minutes, seconds) {
  const totalSeconds = minutes * 60 + seconds;
  let remaining = totalSeconds;
  let timerInterval = null;
  let alarmAudio = new Audio("alarm.wav");
  alarmAudio.loop = true;

  // Create main timer container
  const timerDiv = document.createElement("div");
  timerDiv.className = "stopwatch";

  // Create display element
  const display = document.createElement("div");
  display.className = "display";
  display.setAttribute("role", "timer");
  display.setAttribute("aria-live", "polite");

  // Create controls container
  const controls = document.createElement("div");
  controls.className = "controls";

  // Helper to create a button
  function createButton(iconSrc, title, className, size) {
    const button = document.createElement("button");
    button.innerHTML = `<img src="${iconSrc}" alt="${title}" width="${size}" height="${size}">`;
    button.title = title;
    button.setAttribute("aria-label", title);
    button.className = className;
    return button;
  }

  // Create control buttons
  const startBtn = createButton(
    "play_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
    "Start",
    "start",
    28
  );
  const pauseBtn = createButton(
    "pause_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
    "Pause",
    "stop",
    28
  );
  pauseBtn.disabled = true;
  const resetBtn = createButton(
    "refresh_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
    "Reset",
    "reset",
    28
  );
  resetBtn.disabled = true;
  const removeBtn = createButton(
    "cancel_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png",
    "Remove",
    "remove",
    24
  );

  // Assemble controls
  controls.appendChild(startBtn);
  controls.appendChild(pauseBtn);
  controls.appendChild(resetBtn);
  controls.appendChild(removeBtn);

  // Assemble timer
  timerDiv.appendChild(display);
  timerDiv.appendChild(controls);
  timersContainer.appendChild(timerDiv);

  // Update the timer display
  function updateDisplay() {
    const m = Math.floor(remaining / 60)
      .toString()
      .padStart(2, "0");
    const s = (remaining % 60).toString().padStart(2, "0");
    display.innerHTML = `<span class='time-unit'>${m}</span>:<span class='time-unit'>${s}</span>`;
  }

  // Timer control logic
  function startTimer() {
    if (remaining <= 0 || timerInterval) return;

    // Unlock audio playback (only once)
    alarmAudio
      .play()
      .then(() => {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
      })
      .catch((err) => {
        console.warn("Audio unlock failed:", err);
      });

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    timerInterval = setInterval(() => {
      if (remaining > 0) {
        remaining--;
        updateDisplay();
      }
      if (remaining === 0) {
        timerComplete();
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    remaining = totalSeconds;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
  }

  function timerComplete() {
    clearInterval(timerInterval);
    timerInterval = null;
    startBtn.disabled = true;
    pauseBtn.disabled = true;
    resetBtn.disabled = false;
    playAlarm();
  }

  function playAlarm() {
    alarmAudio.currentTime = 0;
    alarmAudio.play().catch((err) => {
      console.warn("Alarm playback blocked:", err);
    });

    setTimeout(() => {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
    }, 5000);
  }

  function removeTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    timersContainer.removeChild(timerDiv);
    updateTimerContainerState();
  }

  function updateTimerContainerState() {
    if (timersContainer.children.length === 0) {
      timersContainer.style.display = "none";
      addTimerBtn.style.display = "block";
      noTimersMessage.style.display = "block";
      addTimerBtn.style.margin = "32px auto 0 auto";
      addTimerBtn.style.position = "relative";
    }
  }

  // Attach event listeners
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
  removeBtn.addEventListener("click", removeTimer);

  // Initialize display
  updateDisplay();
  timersContainer.style.display = "block";
  addTimerBtn.style.display = "inline-block";
  noTimersMessage.style.display = "none";
}
