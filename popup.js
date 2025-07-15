document.addEventListener('DOMContentLoaded', function () {
  const timersContainer = document.getElementById('timers');
  const addTimerBtn = document.getElementById('add-timer');

  let timerCount = 0;
  let addingTimer = false;

  function createTimer() {
    timerCount++;
    const timerId = `timer-${timerCount}`;

    // Timer elements
    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer';
    timerDiv.id = timerId;

    // Timer name
    const timerName = document.getElementById('timer-name-input').value.trim();
    let nameDiv = null;
    if (timerName) {
      nameDiv = document.createElement('div');
      nameDiv.className = 'timer-name';
      nameDiv.textContent = timerName;
      nameDiv.style.marginTop = '6px';
      nameDiv.style.marginBottom = '6px';
      nameDiv.style.fontWeight = '500';
      nameDiv.style.fontSize = '1.08em';
      nameDiv.style.color = '#ffe082';
      timerDiv.appendChild(nameDiv);
    }

    const display = document.createElement('div');
    display.className = 'display';
    display.innerHTML = "<span class='time-unit'>00</span>:<span class='time-unit'>00</span>:<span class='time-unit'>00</span>";

    const controls = document.createElement('div');
    controls.className = 'controls';

    const startBtn = document.createElement('button');
    startBtn.innerHTML = '<img src="play_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Start" width="28" height="28">';
    startBtn.title = 'Start';
    startBtn.setAttribute('aria-label', 'Start');
    startBtn.className = 'start';

    const stopBtn = document.createElement('button');
    stopBtn.innerHTML = '<img src="pause_circle_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Pause" width="28" height="28">';
    stopBtn.title = 'Stop';
    stopBtn.setAttribute('aria-label', 'Stop');
    stopBtn.className = 'stop';
    stopBtn.disabled = true;

    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '<img src="refresh_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Reset" width="28" height="28">';
    resetBtn.title = 'Reset';
    resetBtn.setAttribute('aria-label', 'Reset');
    resetBtn.className = 'reset';
    resetBtn.disabled = true;

    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(resetBtn);

    // Remove button inside controls
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '<img src="cancel_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.png" alt="Remove" width="24" height="24">';
    removeBtn.title = 'Remove';
    removeBtn.setAttribute('aria-label', 'Remove');
    removeBtn.className = 'remove';
    controls.appendChild(removeBtn);

    timerDiv.appendChild(display);
    timerDiv.appendChild(controls);
    timersContainer.appendChild(timerDiv);

    // Timer logic
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;

    function updateDisplay(time) {
      const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
      const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
      const minutes = Math.floor((time / (1000 * 60))).toString().padStart(2, '0');
      display.innerHTML = `<span class='time-unit'>${minutes}</span>:<span class='time-unit'>${seconds}</span>:<span class='time-unit'>${milliseconds}</span>`;
    }

    function startTimer() {
      startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
      }, 50);
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

    function removeTimer() {
      clearInterval(timerInterval);
      timersContainer.removeChild(timerDiv);
      if (timersContainer.children.length === 0) {
        timersContainer.style.display = 'none';
        addTimerBtn.style.display = 'block';
        document.getElementById('no-timers-message').style.display = 'block';
        addTimerBtn.style.margin = '32px auto 0 auto';
        addTimerBtn.style.display = 'block';
        addTimerBtn.style.position = 'relative';
      }
    }
    removeBtn.addEventListener('click', removeTimer);

    // Initialize
    updateDisplay(0);
    timersContainer.style.display = 'block';
    addTimerBtn.style.display = 'inline-block';
  }

  addTimerBtn.addEventListener('click', function() {
    const nameInput = document.getElementById('timer-name-input');
    if (!addingTimer) {
      // First click: show input and focus
      nameInput.style.display = 'block';
      nameInput.focus();
      document.getElementById('no-timers-message').style.display = 'none';
      addingTimer = true;
      return;
    }
    // Second click: add timer
    createTimer();
    timersContainer.style.display = 'block';
    addTimerBtn.style.display = 'inline-block';
    document.getElementById('no-timers-message').style.display = 'none';
    addTimerBtn.style.margin = '';
    addTimerBtn.style.position = '';
    nameInput.value = '';
    nameInput.style.display = 'none';
    addingTimer = false;
  });

  document.getElementById('timer-name-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      addTimerBtn.click();
    }
  });

  // On load, hide input
  document.getElementById('timer-name-input').style.display = 'none';

  // Add the first timer by default
  document.getElementById('no-timers-message').style.display = 'block';
  timersContainer.style.display = 'none';
  addTimerBtn.style.display = 'block';
  addTimerBtn.style.margin = '32px auto 0 auto';
  addTimerBtn.style.position = 'relative';
});