/**
 * Storage utility for managing stopwatch and timer states in local storage
 */

const STORAGE_KEYS = {
  STOPWATCHES: 'stopwatches_state',
  TIMERS: 'timers_state',
  STOPWATCH_COUNT: 'stopwatch_count'
};

/**
 * Save stopwatch state to local storage
 * @param {Object} stopwatchData - The stopwatch data to save
 */
export function saveStopwatchState(stopwatchData) {
  try {
    const existingData = getStopwatchesState();
    existingData.push(stopwatchData);
    localStorage.setItem(STORAGE_KEYS.STOPWATCHES, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error saving stopwatch state:', error);
  }
}

/**
 * Save timer state to local storage
 * @param {Object} timerData - The timer data to save
 */
export function saveTimerState(timerData) {
  try {
    const existingData = getTimersState();
    existingData.push(timerData);
    localStorage.setItem(STORAGE_KEYS.TIMERS, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error saving timer state:', error);
  }
}

/**
 * Get all saved stopwatch states
 * @returns {Array} Array of stopwatch data objects
 */
export function getStopwatchesState() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STOPWATCHES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading stopwatch state:', error);
    return [];
  }
}

/**
 * Get all saved timer states
 * @returns {Array} Array of timer data objects
 */
export function getTimersState() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.TIMERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading timer state:', error);
    return [];
  }
}

/**
 * Clear all saved states
 */
export function clearAllStates() {
  try {
    localStorage.removeItem(STORAGE_KEYS.STOPWATCHES);
    localStorage.removeItem(STORAGE_KEYS.TIMERS);
    localStorage.removeItem(STORAGE_KEYS.STOPWATCH_COUNT);
  } catch (error) {
    console.error('Error clearing states:', error);
  }
}

/**
 * Remove a specific stopwatch from storage
 * @param {string} stopwatchId - The ID of the stopwatch to remove
 */
export function removeStopwatchFromStorage(stopwatchId) {
  try {
    const existingData = getStopwatchesState();
    const filteredData = existingData.filter(stopwatch => stopwatch.id !== stopwatchId);
    localStorage.setItem(STORAGE_KEYS.STOPWATCHES, JSON.stringify(filteredData));
  } catch (error) {
    console.error('Error removing stopwatch from storage:', error);
  }
}

/**
 * Remove a specific timer from storage
 * @param {string} timerId - The ID of the timer to remove
 */
export function removeTimerFromStorage(timerId) {
  try {
    const existingData = getTimersState();
    const filteredData = existingData.filter(timer => timer.id !== timerId);
    localStorage.setItem(STORAGE_KEYS.TIMERS, JSON.stringify(filteredData));
  } catch (error) {
    console.error('Error removing timer from storage:', error);
  }
}

/**
 * Update stopwatch state in storage
 * @param {string} stopwatchId - The ID of the stopwatch to update
 * @param {Object} updatedData - The updated stopwatch data
 */
export function updateStopwatchState(stopwatchId, updatedData) {
  try {
    const existingData = getStopwatchesState();
    const index = existingData.findIndex(stopwatch => stopwatch.id === stopwatchId);
    if (index !== -1) {
      existingData[index] = { ...existingData[index], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.STOPWATCHES, JSON.stringify(existingData));
    }
  } catch (error) {
    console.error('Error updating stopwatch state:', error);
  }
}

/**
 * Update timer state in storage
 * @param {string} timerId - The ID of the timer to update
 * @param {Object} updatedData - The updated timer data
 */
export function updateTimerState(timerId, updatedData) {
  try {
    const existingData = getTimersState();
    const index = existingData.findIndex(timer => timer.id === timerId);
    if (index !== -1) {
      existingData[index] = { ...existingData[index], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.TIMERS, JSON.stringify(existingData));
    }
  } catch (error) {
    console.error('Error updating timer state:', error);
  }
}

/**
 * Save the current stopwatch count
 * @param {number} count - The current stopwatch count
 */
export function saveStopwatchCount(count) {
  try {
    localStorage.setItem(STORAGE_KEYS.STOPWATCH_COUNT, count.toString());
  } catch (error) {
    console.error('Error saving stopwatch count:', error);
  }
}

/**
 * Get the saved stopwatch count
 * @returns {number} The saved stopwatch count or 0 if not found
 */
export function getStopwatchCount() {
  try {
    const count = localStorage.getItem(STORAGE_KEYS.STOPWATCH_COUNT);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error('Error loading stopwatch count:', error);
    return 0;
  }
} 