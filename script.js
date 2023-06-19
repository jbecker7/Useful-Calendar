var _a;
function formatDate(dateString) {
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}
(_a = document.querySelector('jsuites-calendar')) === null || _a === void 0 ? void 0 : _a.addEventListener('onchange', function (e) {
    var selectedDate = formatDate(e.target.value);
    var spinnerElement = document.getElementById("spinner");
    var resultElement = document.getElementById("result");
    var gameOverElement = document.getElementById("game-over");
    var celebrationElement = document.getElementById("celebration");
    var gameOverAudio = new Audio("gameover.mp3");
    var celebrationAudio = new Audio("celebration.mp3");
    var playLoadingAudio = function () {
        var loadingAudio = new Audio("loading.mp3");
        loadingAudio.play();
        return loadingAudio;
    };
    var stopLoadingAudio = function (loadingAudio) {
        loadingAudio.pause();
        loadingAudio.currentTime = 0;
    };
    var showGameOverScreen = function () {
        stopLoadingAudio(loadingAudio);
        spinnerElement.style.display = "none";
        resultElement.style.display = "none";
        gameOverElement.style.display = "block";
        celebrationElement.style.display = "none"; // Hide celebration element
        gameOverAudio.play();
    };
    var showCelebrationScreen = function () {
        stopLoadingAudio(loadingAudio);
        spinnerElement.style.display = "none";
        resultElement.style.display = "none";
        gameOverElement.style.display = "none";
        celebrationElement.style.display = "block"; // Show celebration element
        celebrationAudio.play();
    };
    spinnerElement.style.display = "block";
    resultElement.style.display = "none";
    gameOverElement.style.display = "none";
    celebrationElement.style.display = "none";
    var loadingAudio = playLoadingAudio();
    setTimeout(function () {
        fetch('http://localhost:8080/date')
            .then(function (response) { return response.text(); })
            .then(function (currentDate) {
            stopLoadingAudio(loadingAudio);
            spinnerElement.style.display = "none";
            if (currentDate === selectedDate) {
                resultElement.style.display = "block";
                resultElement.textContent = "Selected date is today's date.";
                showCelebrationScreen(); // Show celebration only for correct date
            }
            else {
                resultElement.style.display = "none"; // Hide result element
                showGameOverScreen();
            }
        })
            .catch(function (error) {
            stopLoadingAudio(loadingAudio);
            spinnerElement.style.display = "none";
            resultElement.style.display = "block";
            resultElement.textContent = 'Error: ' + error;
        });
    }, 10000);
});
