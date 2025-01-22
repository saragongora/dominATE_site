document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-list");

    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("show");
    });
});

// Dados dos eventos (RJ, SP1, SP2) - Mais organizado em um array de objetos
const eventData = [
    { city: 'RJ', date: new Date('2025-04-01T19:00:00-03:00') },
    { city: 'SP', date: new Date('2025-04-05T19:00:00-03:00') },
    { city: 'SP', date: new Date('2025-04-06T19:00:00-03:00') },
];

let currentEventIndex = 0;
let countdownInterval;
let progressBarInterval;

function updateCountdown() {
    const targetDate = eventData[currentEventIndex].date.getTime();
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').innerHTML = '<span style="font-size: 24px; color: white;">O SHOW COMEÇOU!</span>';
    }
}

function calculateProgress() {
    const startDate = new Date('2024-11-27').getTime();
    const endDate = eventData[currentEventIndex].date.getTime();
    const currentDate = new Date().getTime();
    const totalDuration = endDate - startDate;
    const elapsedTime = currentDate - startDate;

    let progress = (elapsedTime / totalDuration) * 100;
    return Math.max(0, Math.min(100, progress));
}

function updateProgressBar() {
    const progress = calculateProgress();
    document.getElementById('progress-bar').style.width = progress + '%';
}

const rjMapURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2608.2967269873852!2d-43.2948930908324!3d-22.89326993729833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997d070e398159%3A0x9e05df3c77e2e376!2sEst%C3%A1dio%20Ol%C3%ADmpico%20Nilton%20Santos!5e1!3m2!1spt-BR!2sbr!4v1736864702115!5m2!1spt-BR!2sbr";
const spMapURL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.0928476205336!2d-46.722619690798744!3d-23.601002862957994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce56c31b1fe649%3A0x7d134f4dfc6618c2!2sMorumBIS%20-%20Est%C3%A1dio%20C%C3%ADcero%20Pompeu%20de%20Toledo!5e0!3m2!1spt-BR!2sbr!4v1737501630354!5m2!1spt-BR!2sbr";

function updateDisplay() {
    clearInterval(countdownInterval);
    clearInterval(progressBarInterval);

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    updateProgressBar();
    progressBarInterval = setInterval(updateProgressBar, 1000);

    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === currentEventIndex);
    });

    const mapIframe = document.getElementById('map-iframe');
    mapIframe.src = eventData[currentEventIndex].city === 'RJ' ? rjMapURL : spMapURL;

    const loadingText = document.getElementById('loading-text');
    loadingText.textContent = 'Carregando...';
}

function handleButtonClick(index) {
    currentEventIndex = index;
    updateDisplay();
}

const buttons = document.querySelectorAll('.nav-button');
buttons.forEach((button, index) => {
    button.addEventListener('click', () => handleButtonClick(index));
});

const phrases = ['Carregando...', 'Stray Kids está chegando...'];
let currentPhraseIndex = 0;

function toggleLoadingText() {
    const loadingText = document.getElementById('loading-text');
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    loadingText.textContent = phrases[currentPhraseIndex];
}

let loadingTextInterval = setInterval(toggleLoadingText, 2500);

updateDisplay();
