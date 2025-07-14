document.addEventListener('DOMContentLoaded', function () {
  const timersContainer = document.getElementById('timers');
  const addTimerBtn = document.getElementById('add-timer');

  let timerCount = 0;

  function createTimer() {
    timerCount++;
    const timerId = `timer-${timerCount}`;

    // Timer elements
    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer';
    timerDiv.id = timerId;

    const display = document.createElement('div');
    display.className = 'display';
    display.textContent = '00:00';

    const controls = document.createElement('div');
    controls.className = 'controls';

    const startBtn = document.createElement('button');
    startBtn.innerHTML = 'Start';
    startBtn.title = 'Start';
    startBtn.setAttribute('aria-label', 'Start');
    startBtn.className = 'start';

    const stopBtn = document.createElement('button');
    stopBtn.innerHTML = 'Pause';
    stopBtn.title = 'Stop';
    stopBtn.setAttribute('aria-label', 'Stop');
    stopBtn.className = 'stop';
    stopBtn.disabled = true;

    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = 'Restart';
    resetBtn.title = 'Reset';
    resetBtn.setAttribute('aria-label', 'Reset');
    resetBtn.className = 'reset';
    resetBtn.disabled = true;

    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(resetBtn);

    timerDiv.appendChild(display);
    timerDiv.appendChild(controls);
    timersContainer.appendChild(timerDiv);

    // Timer logic
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;

    function updateDisplay(time) {
      const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
      const minutes = Math.floor((time / (1000 * 60))).toString().padStart(2, '0');
      display.textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
      }, 200);
      startBtn.disabled = true;
      stopBtn.disabled = false;
      resetBtn.disabled = false;
    }

    function stopTimer() {
      clearInterval(timerInterval);
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }

    function resetTimer() {
      clearInterval(timerInterval);
      elapsedTime = 0;
      updateDisplay(elapsedTime);
      startBtn.disabled = false;
      stopBtn.disabled = true;
      resetBtn.disabled = true;
    }

    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Initialize
    updateDisplay(0);
  }

  addTimerBtn.addEventListener('click', createTimer);

  // Add the first timer by default
  createTimer();
});