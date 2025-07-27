// state.js
import { stopwatchesContainer, addStopwatchBtn, nameInput, timersContainer, addTimerBtn, timerMinutesInput, timerSecondsInput } from './ui.js';

export function updateAddStopwatchState() {
  if (stopwatchesContainer.children.length >= 3) {
    addStopwatchBtn.disabled = true;
    nameInput.disabled = true;
    let limitMsg = document.getElementById('stopwatch-limit-message');
    if (!limitMsg) {
      limitMsg = document.createElement('div');
      limitMsg.id = 'stopwatch-limit-message';
      limitMsg.textContent = 'Maximum 3 stopwatches allowed.';
      limitMsg.className = 'limit-message';
      addStopwatchBtn.parentNode.insertBefore(limitMsg, addStopwatchBtn.nextSibling);
    }
  } else {
    addStopwatchBtn.disabled = false;
    nameInput.disabled = false;
    const limitMsg = document.getElementById('stopwatch-limit-message');
    if (limitMsg) limitMsg.remove();
  }
}

export function showLimitMessage() {
  let limitMsg = document.getElementById('stopwatch-limit-message');
  if (!limitMsg) {
    limitMsg = document.createElement('div');
    limitMsg.id = 'stopwatch-limit-message';
    limitMsg.textContent = 'Maximum 3 stopwatches allowed.';
    limitMsg.className = 'limit-message';
    addStopwatchBtn.parentNode.insertBefore(limitMsg, addStopwatchBtn.nextSibling);
  }
  limitMsg.style.display = 'block';
  setTimeout(() => {
    if (limitMsg) limitMsg.style.display = 'none';
  }, 3000);
} 

export function updateAddTimerState() {
  if (timersContainer.children.length >= 3) {
    addTimerBtn.disabled = true;
    timerMinutesInput.disabled = true;
    timerSecondsInput.disabled = true;
    let limitMsg = document.getElementById('timer-limit-message');
    if (!limitMsg) {
      limitMsg = document.createElement('div');
      limitMsg.id = 'timer-limit-message';
      limitMsg.textContent = 'Maximum 3 timers allowed.';
      limitMsg.className = 'limit-message';
      addTimerBtn.parentNode.insertBefore(limitMsg, addTimerBtn.nextSibling);
    }
  } else {
    addTimerBtn.disabled = false;
    timerMinutesInput.disabled = false;
    timerSecondsInput.disabled = false;
    const limitMsg = document.getElementById('timer-limit-message');
    if (limitMsg) limitMsg.remove();
  }
}

export function showTimerLimitMessage() {
  let limitMsg = document.getElementById('timer-limit-message');
  if (!limitMsg) {
    limitMsg = document.createElement('div');
    limitMsg.id = 'timer-limit-message';
    limitMsg.textContent = 'Maximum 3 timers allowed.';
    limitMsg.className = 'limit-message';
    addTimerBtn.parentNode.insertBefore(limitMsg, addTimerBtn.nextSibling);
  }
  limitMsg.style.display = 'block';
  setTimeout(() => {
    if (limitMsg) limitMsg.style.display = 'none';
  }, 3000);
} 