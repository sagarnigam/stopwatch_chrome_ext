document.addEventListener('DOMContentLoaded', function () {
  const stopwatchesContainer = document.getElementById('stopwatches');
  const addStopwatchBtn = document.getElementById('add-stopwatch');

  let stopwatchCount = 0;
  let addingStopwatch = false;

  function createStopwatch() {
    stopwatchCount++;
    const stopwatchId = `stopwatch-${stopwatchCount}`;

    // Stopwatch elements
    const stopwatchDiv = document.createElement('div');
    stopwatchDiv.className = 'stopwatch';
    stopwatchDiv.id = stopwatchId;

    // Stopwatch name
    const stopwatchName = document.getElementById('stopwatch-name-input').value.trim();
    let nameDiv = null;
    if (stopwatchName) {
      nameDiv = document.createElement('div');
      nameDiv.className = 'stopwatch-name';
      nameDiv.textContent = stopwatchName;
      nameDiv.style.marginTop = '6px';
      nameDiv.style.marginBottom = '6px';
      nameDiv.style.fontWeight = '500';
      nameDiv.style.fontSize = '1.08em';
      nameDiv.style.color = '#ffe082';
      stopwatchDiv.appendChild(nameDiv);
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
      startTime = Date.now() - elapsedTime;
      stopwatchInterval = setInterval(function () {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
      }, 50);
      startBtn.disabled = true;
      stopBtn.disabled = false;
      resetBtn.disabled = false;
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
        document.getElementById('no-stopwatches-message').style.display = 'block';
        addStopwatchBtn.style.margin = '32px auto 0 auto';
        addStopwatchBtn.style.display = 'block';
        addStopwatchBtn.style.position = 'relative';
      }
    }
    removeBtn.addEventListener('click', removeStopwatch);

    // Initialize
    updateDisplay(0);
    stopwatchesContainer.style.display = 'block';
    addStopwatchBtn.style.display = 'inline-block';
  }

  addStopwatchBtn.addEventListener('click', function() {
    const nameInput = document.getElementById('stopwatch-name-input');
    if (!addingStopwatch) {
      // First click: show input and focus
      nameInput.style.display = 'block';
      nameInput.focus();
      document.getElementById('no-stopwatches-message').style.display = 'none';
      addingStopwatch = true;
      return;
    }
    // Second click: add stopwatch
    createStopwatch();
    stopwatchesContainer.style.display = 'block';
    addStopwatchBtn.style.display = 'inline-block';
    document.getElementById('no-stopwatches-message').style.display = 'none';
    addStopwatchBtn.style.margin = '';
    addStopwatchBtn.style.position = '';
    nameInput.value = '';
    nameInput.style.display = 'none';
    addingStopwatch = false;
  });

  document.getElementById('stopwatch-name-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      addStopwatchBtn.click();
    }
  });

  // On load, hide input
  document.getElementById('stopwatch-name-input').style.display = 'none';

  // Add the first stopwatch by default
  document.getElementById('no-stopwatches-message').style.display = 'block';
  stopwatchesContainer.style.display = 'none';
  addStopwatchBtn.style.display = 'block';
  addStopwatchBtn.style.margin = '32px auto 0 auto';
  addStopwatchBtn.style.position = 'relative';
});