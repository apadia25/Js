document.addEventListener('DOMContentLoaded', () => {
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const hundredthSecondInput = document.getElementById('hundredthSecond');

    let timer;
    let totalHundredths = 0;

    const updateDisplay = () => {
        const hours = Math.floor(totalHundredths / 360000);
        const minutes = Math.floor((totalHundredths % 360000) / 6000);
        const seconds = Math.floor((totalHundredths % 6000) / 100);
        const hundredths = totalHundredths % 100;

        hoursInput.value = hours;
        minutesInput.value = minutes;
        secondsInput.value = seconds;
        hundredthSecondInput.value = hundredths;
    };

    const startTimer = () => {
        if (!timer) {
            timer = setInterval(() => {
                totalHundredths++;
                updateDisplay();
            }, 10); // Update every 10 milliseconds for hundredths of a second
        }
    };

    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        totalHundredths = 0;
        updateDisplay();
    };

    document.querySelector('button[name="start"]').addEventListener('click', startTimer);
    document.querySelector('button[name="stop"]').addEventListener('click', stopTimer);
    document.querySelector('button[name="reset"]').addEventListener('click', resetTimer);
});
