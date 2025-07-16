// state.js
import { stopwatchesContainer, addStopwatchBtn, nameInput } from './ui.js';

export function updateAddStopwatchState() {
  if (stopwatchesContainer.children.length >= 3) {
    addStopwatchBtn.disabled = true;
    nameInput.disabled = true;
    let limitMsg = document.getElementById('stopwatch-limit-message');
    if (!limitMsg) {
      limitMsg = document.createElement('div');
      limitMsg.id = 'stopwatch-limit-message';
      limitMsg.textContent = 'Maximum 3 stopwatches allowed.';
      limitMsg.style.color = '#ff1744';
      limitMsg.style.textAlign = 'center';
      limitMsg.style.margin = '8px 0 0 0';
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
    limitMsg.style.color = '#ff1744';
    limitMsg.style.textAlign = 'center';
    limitMsg.style.margin = '8px 0 0 0';
    addStopwatchBtn.parentNode.insertBefore(limitMsg, addStopwatchBtn.nextSibling);
  }
  limitMsg.style.display = 'block';
  setTimeout(() => {
    if (limitMsg) limitMsg.style.display = 'none';
  }, 2000);
} 