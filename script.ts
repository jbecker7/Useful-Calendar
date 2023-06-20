const waitTimeElement: HTMLElement | null = document.getElementById("wait-time");
const startTime: number = Date.now();

function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

const waittime: number = Math.floor(Math.random() * 10000) + 20000;

document.querySelector('jsuites-calendar')?.addEventListener('onchange', function(e: Event) {
    const selectedDate = formatDate((e.target as HTMLInputElement).value);
    const hourglassElement = document.getElementById("hourglass")!;
    const resultElement = document.getElementById("result")!;
    const gameOverElement = document.getElementById("game-over")!;
    const celebrationElement = document.getElementById("celebration")!;
    const gameOverAudio = new Audio("gameover.mp3");
    const celebrationAudio = new Audio("celebration.mp3");

    const playLoadingAudio = (): HTMLAudioElement => {
        const loadingAudio = new Audio("loading.mp3");
        loadingAudio.play();
        return loadingAudio;
    };

    const stopLoadingAudio = (loadingAudio: HTMLAudioElement) => {
        loadingAudio.pause();
        loadingAudio.currentTime = 0;
    };

    const showGameOverScreen = () => {
        stopLoadingAudio(loadingAudio);
        hourglassElement.style.display = "none";
        resultElement.style.display = "none";
        gameOverElement.style.display = "block";
        celebrationElement.style.display = "none";
        gameOverAudio.play();
    };

    const showCelebrationScreen = () => {
        stopLoadingAudio(loadingAudio);
        hourglassElement.style.display = "none";
        resultElement.style.display = "none";
        gameOverElement.style.display = "none";
        celebrationElement.style.display = "block";
        celebrationAudio.play();
    };

    hourglassElement.style.display = "block";
    resultElement.style.display = "none";
    gameOverElement.style.display = "none";
    celebrationElement.style.display = "none";

    const loadingAudio = playLoadingAudio();

    setTimeout(function() {
        fetch('http://localhost:8080/date')
            .then(response => response.text())
            .then(currentDate => {
                stopLoadingAudio(loadingAudio);
                hourglassElement.style.display = "none";
                if (currentDate === selectedDate) {
                    resultElement.style.display = "block";
                    resultElement.textContent = "Selected date is today's date.";
                    showCelebrationScreen();
                } else {
                    resultElement.style.display = "none";
                    showGameOverScreen();
                }
            })
            .catch(error => {
                stopLoadingAudio(loadingAudio);
                hourglassElement.style.display = "none";
                resultElement.style.display = "block";
                resultElement.textContent = 'Error: ' + error;
            });
    }, waittime);
    console.log('waittime: ' + waittime);

    // Update wait time element
    if (waitTimeElement) {
        waitTimeElement.textContent = "Wait Time: " + (waittime / 1000) + " seconds";
        waitTimeElement.style.display = "block";
    }
});

// Create a separate block to display elapsed time
const elapsedTimeElement = document.createElement("div");
elapsedTimeElement.id = "elapsed-time";
elapsedTimeElement.style.position = "fixed";
elapsedTimeElement.style.top = "10px";
elapsedTimeElement.style.right = "10px";
elapsedTimeElement.style.backgroundColor = "FFF";
elapsedTimeElement.style.color = "#FFF";
elapsedTimeElement.style.padding = "10px";
elapsedTimeElement.style.border = "2px solid #FFF";
document.body.appendChild(elapsedTimeElement);

// Update elapsed time
setInterval(function() {
    const elapsedTime = Date.now() - startTime;
    elapsedTimeElement.textContent = "You have been on this site for " + Math.floor(elapsedTime / 1000) + " seconds";
}, 100);

if (waitTimeElement) {
    waitTimeElement.textContent = "Current Wait Time: " + waittime / 1000 + " seconds";
    waitTimeElement.style.display = "block";
}