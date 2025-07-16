import { stopwatchesContainer, addStopwatchBtn, nameInput, noStopwatchesMessage, timerContainer, timersContainer, noTimersMessage, timerMinutesInput, timerSecondsInput, addTimerBtn } from './ui.js';
import { createStopwatch } from './stopwatch.js';
import { updateAddStopwatchState, showLimitMessage } from './state.js';

document.addEventListener('DOMContentLoaded', function () {
  let addingStopwatch = false;

  // Navigation logic
  const navStopwatches = document.getElementById('nav-stopwatches');
  const navTimers = document.getElementById('nav-timers');

  function showStopwatchSection() {
    document.getElementById('stopwatch-container').style.display = 'block';
    timerContainer.style.display = 'none';
    navStopwatches.classList.add('active');
    navTimers.classList.remove('active');
  }
  function showTimerSection() {
    document.getElementById('stopwatch-container').style.display = 'none';
    timerContainer.style.display = 'block';
    navTimers.classList.add('active');
    navStopwatches.classList.remove('active');
  }
  navStopwatches.addEventListener('click', showStopwatchSection);
  navTimers.addEventListener('click', showTimerSection);
  // Default to stopwatch section
  showStopwatchSection();

  addStopwatchBtn.addEventListener('click', function() {
    if (stopwatchesContainer.children.length >= 3) {
      showLimitMessage();
      return;
    }
    if (!addingStopwatch) {
      // First click: show input and focus
      nameInput.style.display = 'block';
      nameInput.focus();
      noStopwatchesMessage.style.display = 'none';
      addingStopwatch = true;
      return;
    }
    // Second click: add stopwatch
    createStopwatch();
    stopwatchesContainer.style.display = 'block';
    addStopwatchBtn.style.display = 'inline-block';
    noStopwatchesMessage.style.display = 'none';
    addStopwatchBtn.style.margin = '';
    addStopwatchBtn.style.position = '';
    nameInput.value = '';
    nameInput.style.display = 'none';
    addingStopwatch = false;
  });

  nameInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      addStopwatchBtn.click();
    }
  });

  // On load, hide input
  nameInput.style.display = 'none';

  // Add the first stopwatch by default
  noStopwatchesMessage.style.display = 'block';
  stopwatchesContainer.style.display = 'none';
  addStopwatchBtn.style.display = 'block';
  addStopwatchBtn.style.margin = '32px auto 0 auto';
  addStopwatchBtn.style.position = 'relative';
  updateAddStopwatchState();

  // Timer logic
  let addingTimer = false;
  addTimerBtn.addEventListener('click', function() {
    if (!addingTimer) {
      timerMinutesInput.style.display = 'inline-block';
      timerSecondsInput.style.display = 'inline-block';
      timerMinutesInput.focus();
      noTimersMessage.style.display = 'none';
      addingTimer = true;
      return;
    }
    // Second click: add timer
    let minutes = parseInt(timerMinutesInput.value, 10) || 0;
    let seconds = parseInt(timerSecondsInput.value, 10) || 0;
    if (minutes === 0 && seconds === 0) {
      // Don't add a timer with 0:00
      return;
    }
    createTimer(minutes, seconds);
    timersContainer.style.display = 'block';
    addTimerBtn.style.display = 'inline-block';
    noTimersMessage.style.display = 'none';
    addTimerBtn.style.margin = '';
    addTimerBtn.style.position = '';
    timerMinutesInput.value = '';
    timerSecondsInput.value = '';
    timerMinutesInput.style.display = 'none';
    timerSecondsInput.style.display = 'none';
    addingTimer = false;
  });
  timerMinutesInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      addTimerBtn.click();
    }
  });
  timerSecondsInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      addTimerBtn.click();
    }
  });
  // On load, hide timer inputs
  timerMinutesInput.style.display = 'none';
  timerSecondsInput.style.display = 'none';
  noTimersMessage.style.display = 'block';
  timersContainer.style.display = 'none';

  function createTimer(minutes, seconds) {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'stopwatch'; // reuse style
    let totalSeconds = minutes * 60 + seconds;
    let remaining = totalSeconds;
    let timerInterval = null;
    const display = document.createElement('div');
    display.className = 'display';
    function updateDisplay() {
      const m = Math.floor(remaining / 60).toString().padStart(2, '0');
      const s = (remaining % 60).toString().padStart(2, '0');
      display.innerHTML = `<span class='time-unit'>${m}</span>:<span class='time-unit'>${s}</span>`;
    }
    updateDisplay();
    const controls = document.createElement('div');
    controls.className = 'controls';
    const startBtn = document.createElement('button');
    startBtn.innerHTML = '<img src="play_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Start" width="28" height="28">';
    startBtn.title = 'Start';
    startBtn.setAttribute('aria-label', 'Start');
    startBtn.className = 'start';
    const pauseBtn = document.createElement('button');
    pauseBtn.innerHTML = '<img src="pause_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Pause" width="28" height="28">';
    pauseBtn.title = 'Pause';
    pauseBtn.setAttribute('aria-label', 'Pause');
    pauseBtn.className = 'stop';
    pauseBtn.disabled = true;
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '<img src="refresh_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Reset" width="28" height="28">';
    resetBtn.title = 'Reset';
    resetBtn.setAttribute('aria-label', 'Reset');
    resetBtn.className = 'reset';
    resetBtn.disabled = true;
    controls.appendChild(startBtn);
    controls.appendChild(pauseBtn);
    controls.appendChild(resetBtn);
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<img src="cancel_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Remove" width="24" height="24">';
    removeBtn.title = 'Remove';
    removeBtn.setAttribute('aria-label', 'Remove');
    removeBtn.className = 'remove';
    controls.appendChild(removeBtn);
    timerDiv.appendChild(display);
    timerDiv.appendChild(controls);
    timersContainer.appendChild(timerDiv);
    function startTimer() {
      if (remaining <= 0) return;
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      resetBtn.disabled = false;
      timerInterval = setInterval(() => {
        if (remaining > 0) {
          remaining--;
          updateDisplay();
        }
        if (remaining === 0) {
          clearInterval(timerInterval);
          startBtn.disabled = true;
          pauseBtn.disabled = true;
          resetBtn.disabled = false;
          // Optionally: play sound or flash
        }
      }, 1000);
    }
    function pauseTimer() {
      clearInterval(timerInterval);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
    function resetTimer() {
      clearInterval(timerInterval);
      remaining = totalSeconds;
      updateDisplay();
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resetBtn.disabled = true;
    }
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    removeBtn.addEventListener('click', function() {
      clearInterval(timerInterval);
      timersContainer.removeChild(timerDiv);
      if (timersContainer.children.length === 0) {
        timersContainer.style.display = 'none';
        addTimerBtn.style.display = 'block';
        noTimersMessage.style.display = 'block';
        addTimerBtn.style.margin = '32px auto 0 auto';
        addTimerBtn.style.display = 'block';
        addTimerBtn.style.position = 'relative';
      }
    });
    timersContainer.style.display = 'block';
    addTimerBtn.style.display = 'inline-block';
    noTimersMessage.style.display = 'none';
  }
});