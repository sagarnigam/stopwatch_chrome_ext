// stopwatch.js
import { stopwatchesContainer, addStopwatchBtn, nameInput, noStopwatchesMessage, createElement } from './ui.js';
import { updateAddStopwatchState, showLimitMessage } from './state.js';

let stopwatchCount = 0;

export function createStopwatch() {
  stopwatchCount++;
  const stopwatchId = `stopwatch-${stopwatchCount}`;

  // Stopwatch elements
  const stopwatchDiv = createElement('div', { className: 'stopwatch', id: stopwatchId });

  const stopwatchName = nameInput.value.trim();
  let nameDiv = null;
  if (stopwatchName) {
    nameDiv = createElement('div', { className: 'stopwatch-name', textContent: stopwatchName });
    stopwatchDiv.appendChild(nameDiv);
  }

  const display = createElement('div', { className: 'display' });
  display.innerHTML = "<span class='time-unit'>00</span>:<span class='time-unit'>00</span>:<span class='time-unit'>00</span>";

  const controls = createElement('div', { className: 'controls' });

  const startBtn = createElement('button', { className: 'start', attrs: { 'aria-label': 'Start', title: 'Start' } });
  startBtn.innerHTML = '<img src="play_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Start" width="28" height="28">';

  const stopBtn = createElement('button', { className: 'stop', attrs: { 'aria-label': 'Stop', title: 'Stop' } });
  stopBtn.innerHTML = '<img src="pause_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Pause" width="28" height="28">';
  stopBtn.disabled = true;

  const resetBtn = createElement('button', { className: 'reset', attrs: { 'aria-label': 'Reset', title: 'Reset' } });
  resetBtn.innerHTML = '<img src="refresh_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Reset" width="28" height="28">';
  resetBtn.disabled = true;

  controls.appendChild(startBtn);
  controls.appendChild(stopBtn);
  controls.appendChild(resetBtn);

  const removeBtn = createElement('button', { className: 'remove', attrs: { 'aria-label': 'Remove', title: 'Remove' } });
  removeBtn.innerHTML = '<img src="cancel_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Remove" width="24" height="24">';
  controls.appendChild(removeBtn);

  stopwatchDiv.appendChild(display);
  stopwatchDiv.appendChild(controls);
  stopwatchesContainer.appendChild(stopwatchDiv);

  // Stopwatch logic
  let startTime = 0;
  let elapsedTime = 0;
  let stopwatchInterval;

  function updateDisplay(time) {
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60))).toString().padStart(2, '0');
    display.innerHTML = `<span class='time-unit'>${minutes}</span>:<span class='time-unit'>${seconds}</span>:<span class='time-unit'>${milliseconds}</span>`;
  }

  function startStopwatch() {
    // Show 3-second countdown overlay
    let countdown = 3;
    const countdownOverlay = createElement('div', { className: 'countdown-overlay' });
    countdownOverlay.textContent = countdown;
    stopwatchDiv.style.position = 'relative';
    stopwatchDiv.appendChild(countdownOverlay);
    display.classList.add('blurred');
    startBtn.disabled = true;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    let countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        countdownOverlay.textContent = countdown;
      } else {
        clearInterval(countdownInterval);
        stopwatchDiv.removeChild(countdownOverlay);
        display.classList.remove('blurred');
        // Now start the stopwatch
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(function () {
          elapsedTime = Date.now() - startTime;
          updateDisplay(elapsedTime);
        }, 50);
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = false;
      }
    }, 1000);
  }

  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }

  function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
  }

  startBtn.addEventListener('click', startStopwatch);
  stopBtn.addEventListener('click', stopStopwatch);
  resetBtn.addEventListener('click', resetStopwatch);

  function removeStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchesContainer.removeChild(stopwatchDiv);
    if (stopwatchesContainer.children.length === 0) {
      stopwatchesContainer.style.display = 'none';
      addStopwatchBtn.style.display = 'block';
      noStopwatchesMessage.style.display = 'block';
      addStopwatchBtn.style.margin = '32px auto 0 auto';
      addStopwatchBtn.style.display = 'block';
      addStopwatchBtn.style.position = 'relative';
    }
    updateAddStopwatchState();
  }
  removeBtn.addEventListener('click', removeStopwatch);

  // Initialize
  updateDisplay(0);
  stopwatchesContainer.style.display = 'block';
  addStopwatchBtn.style.display = 'inline-block';
  updateAddStopwatchState();
} 