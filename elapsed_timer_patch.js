// Start elapsed timer
function startElapsedTimer() {
    elapsedSeconds = 0;
    let milliseconds = 0;
    document.getElementById('elapsed-timer').textContent = '0.0';

    if (elapsedTimer) clearInterval(elapsedTimer);

    elapsedTimer = setInterval(() => {
        milliseconds += 100;
        const totalSeconds = (milliseconds / 1000).toFixed(1);
        document.getElementById('elapsed-timer').textContent = totalSeconds;

        if (milliseconds >= 1000) {
            elapsedSeconds++;
            milliseconds = 0;
        }
    }, 100);
}
