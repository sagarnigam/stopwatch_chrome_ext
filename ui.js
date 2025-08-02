// ui.js

// UI element selectors
export const stopwatchesContainer = document.getElementById('stopwatches');
export const addStopwatchBtn = document.getElementById('add-stopwatch');
export const nameInput = document.getElementById('stopwatch-name-input');
export const noStopwatchesMessage = document.getElementById('no-stopwatches-message');
export const stopwatchEnterMessage = document.getElementById('stopwatch-enter-message');
export const timerContainer = document.getElementById('timer-container');
export const timersContainer = document.getElementById('timers');
export const noTimersMessage = document.getElementById('no-timers-message');
export const timerMinutesInput = document.getElementById('timer-minutes-input');
export const timerSecondsInput = document.getElementById('timer-seconds-input');
export const timerEnterMessage = document.getElementById('timer-enter-message');
export const addTimerBtn = document.getElementById('add-timer');

// Helper to create DOM elements with class and attributes
export function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) el.className = options.className;
  if (options.id) el.id = options.id;
  if (options.textContent) el.textContent = options.textContent;
  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      el.setAttribute(k, v);
    }
  }
  return el;
} 