/**
 * Navigation Module (Functional)
 * Handles switching between stopwatch and timer sections using plain functions
 */

import { timerContainer } from "./ui.js";

// Navigation elements
const navStopwatches = document.getElementById("nav-stopwatches");
const navTimers = document.getElementById("nav-timers");

/**
 * Shows the stopwatch section and hides timer section
 */
function showStopwatchSection() {
  document.getElementById("stopwatch-container").style.display = "block";
  timerContainer.style.display = "none";
  navStopwatches.classList.add("active");
  navTimers.classList.remove("active");
}

/**
 * Shows the timer section and hides stopwatch section
 */
function showTimerSection() {
  document.getElementById("stopwatch-container").style.display = "none";
  timerContainer.style.display = "block";
  navTimers.classList.add("active");
  navStopwatches.classList.remove("active");
}

/**
 * Initializes navigation event listeners and sets default section
 */
export function initNavigation() {
  navStopwatches.addEventListener("click", showStopwatchSection);
  navTimers.addEventListener("click", showTimerSection);
  // Default to stopwatch section
  showStopwatchSection();
} 