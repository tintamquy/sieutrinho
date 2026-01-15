// Start elapsed timer
function startElapsedTimer() {
    elapsedSeconds = 0;
    let startTime = Date.now();
    document.getElementById('elapsed-timer').textContent = '0.0';

    if (elapsedTimer) clearInterval(elapsedTimer);

    elapsedTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const totalSeconds = (elapsed / 1000).toFixed(1);
        document.getElementById('elapsed-timer').textContent = totalSeconds;
        elapsedSeconds = Math.floor(elapsed / 1000);
    }, 100);
}
