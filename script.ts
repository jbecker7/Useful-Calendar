function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

document.querySelector('jsuites-calendar')?.addEventListener('onchange', function(e: Event) {
    const selectedDate = formatDate((e.target as HTMLInputElement).value);
    const spinnerElement = document.getElementById("spinner")!;
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
        spinnerElement.style.display = "none";
        resultElement.style.display = "none";
        gameOverElement.style.display = "block";
        celebrationElement.style.display = "none"; 
        gameOverAudio.play();
    };

    const showCelebrationScreen = () => {
        stopLoadingAudio(loadingAudio);
        spinnerElement.style.display = "none";
        resultElement.style.display = "none";
        gameOverElement.style.display = "none";
        celebrationElement.style.display = "block";
        celebrationAudio.play();
    };

    spinnerElement.style.display = "block";
    resultElement.style.display = "none";
    gameOverElement.style.display = "none";
    celebrationElement.style.display = "none";

    const loadingAudio = playLoadingAudio();

    setTimeout(function() {
        fetch('http://localhost:8080/date')
            .then(response => response.text())
            .then(currentDate => {
                stopLoadingAudio(loadingAudio);
                spinnerElement.style.display = "none";
                if(currentDate === selectedDate) {
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
                spinnerElement.style.display = "none";
                resultElement.style.display = "block";
                resultElement.textContent = 'Error: ' + error;
            });
    }, 10000);
});
