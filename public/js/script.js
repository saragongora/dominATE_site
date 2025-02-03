document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-list");

    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("show");
    });
});

// Dados dos eventos (RJ, SP1, SP2)
const eventData = [
    { city: 'RJ', date: new Date('2025-04-01T19:00:00-03:00') },
    { city: 'SP', date: new Date('2025-04-05T19:00:00-03:00') },
    { city: 'SP', date: new Date('2025-04-06T19:00:00-03:00') },
];

// Links dos countdowns
const countdownLinks = [
    "https://embed-countdown.onlinealarmkur.com/pt/#2025-04-01T19:30:00@America%2FSao_Paulo",
    "https://embed-countdown.onlinealarmkur.com/pt/#2025-04-05T19:30:00@America%2FSao_Paulo",
    "https://embed-countdown.onlinealarmkur.com/pt/#2025-04-06T19:30:00@America%2FSao_Paulo"
];

let currentEventIndex = 0;
let progressBarInterval;

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
    clearInterval(progressBarInterval);

    // Atualiza a barra de progresso
    updateProgressBar();
    progressBarInterval = setInterval(updateProgressBar, 1000);

    // Atualiza os botões ativos
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach((button, index) => {
        button.classList.toggle('active', index === currentEventIndex);
    });

    // Atualiza o iframe do countdown
    document.getElementById('countdown-frame').src = countdownLinks[currentEventIndex];

    // Atualiza o mapa
    const mapIframe = document.getElementById('map-iframe');
    mapIframe.src = eventData[currentEventIndex].city === 'RJ' ? rjMapURL : spMapURL;

    // Atualiza o texto de carregamento
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

// Alternância de frases no texto de carregamento
const phrases = ['Carregando...', 'Stray Kids está chegando...'];
let currentPhraseIndex = 0;

function toggleLoadingText() {
    const loadingText = document.getElementById('loading-text');
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    loadingText.textContent = phrases[currentPhraseIndex];
}

// Inicia a exibição ao carregar a página
updateDisplay();


document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".checklist input[type='checkbox']");
    
    // Recupera o estado dos checkboxes do localStorage
    checkboxes.forEach((checkbox) => {
        const item = checkbox.getAttribute("data-item");
        const savedState = localStorage.getItem(item);

        if (savedState === "checked") {
            checkbox.checked = true;
            checkbox.parentElement.style.textDecoration = "line-through";
            checkbox.parentElement.style.color = "#000000";
        }

        // Adiciona o evento de mudança para salvar o estado e alterar o estilo
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                localStorage.setItem(item, "checked");
                checkbox.parentElement.style.textDecoration = "line-through";
                checkbox.parentElement.style.color = "#8D0801";
            } else {
                localStorage.removeItem(item);
                checkbox.parentElement.style.textDecoration = "none";
                checkbox.parentElement.style.color = "#000000";
            }
        });
    });
});

function toggleInfo(index) {
    const buttons = document.querySelectorAll('.circle-btn');
    const boxes = document.querySelectorAll('.info-box');
    const container = document.querySelector('.circle-btn-container');
    const currentButton = buttons[index - 1];
    const currentBox = document.getElementById(`info-box-${index}`);
    const buttonImage = currentButton.querySelector('.btn-image'); // Seleciona a imagem do botão
    const imagePaths = [
        'images/bolsa.png', 'images/regras.png', 'images/projeto.png', 'images/pergunta.png', 'images/ingresso.png'
    ];
    const activeImagePaths = [
        'images/bolsa2.png', 'images/regras2.png', 'images/projeto2.png', 'images/pergunta2.png', 'images/ingresso2.png'
    ];

    console.log(`Botão ${index} clicado`); // Depuração

    // Se o botão já está ativo (foi clicado novamente), desativa ele
    if (currentButton.classList.contains('active')) {
        console.log(`Fechando info-box-${index}`);
        currentButton.classList.remove('active');
        currentBox.classList.remove('active');
        container.classList.remove('active');
        buttonImage.src = imagePaths[index - 1]; // Restaura a imagem original
    } else {
        // Primeiro, desativa todos os botões e reverte as imagens
        buttons.forEach((btn, i) => {
            btn.classList.remove('active');
            const btnImage = btn.querySelector('.btn-image');
            btnImage.src = imagePaths[i]; // Restaura a imagem original
        });

        // Desativa todas as caixas de informações
        boxes.forEach(box => box.classList.remove('active'));
        container.classList.remove('active');

        // Agora ativa o botão e a caixa correspondente
        currentButton.classList.add('active');
        currentBox.classList.add('active');
        container.classList.add('active');
        buttonImage.src = activeImagePaths[index - 1]; // Aplica a imagem ativa
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(button => {
        button.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const isVisible = answer.style.display === "block";

            // Esconder todas as respostas
            document.querySelectorAll(".faq-answer").forEach(item => item.style.display = "none");

            // Mostrar ou ocultar a resposta clicada
            answer.style.display = isVisible ? "none" : "block";
        });
    });

    // Elementos principais
    const buttonsContainer = document.querySelector(".buttons-container");
    const infoContent = document.querySelector(".info-content");
    const infoText = document.getElementById("info-text");
    const backButton = document.querySelector(".back-btn");
    const valoresInfo = document.getElementById("valores-info");
    const estadoSelect = document.getElementById("estado-select");
    const valoresTabela = document.getElementById("valores-tabela").getElementsByTagName("tbody")[0];

    // Esconde a seta ao carregar a página
    backButton.classList.add("hidden");

    // Tabelas de valores por estado
    const valoresRJ = [
        ["Pista Premium", "R$ 920,00", "R$ 460,00"],
        ["Pista", "R$ 590,00", "R$ 295,00"],
        ["Cadeira Sul", "R$ 590,00", "R$ 295,00"],
        ["Cadeira Inferior Leste", "R$ 750,00", "R$ 375,00"],
        ["Cadeira Inferior Oeste", "R$ 750,00", "R$ 375,00"],
        ["Cadeira Superior Leste", "R$ 440,00", "R$ 220,00"],
        ["Cadeira Superior Oeste A e B", "R$ 440,00", "R$ 220,00"],
        ["Soundcheck VIP Package", "R$ 2.581,00", "R$ 2.121,00"]
    ];

    const valoresSP = [
        ["Pista Premium", "R$ 920,00", "R$ 460,00"],
        ["Pista", "R$ 590,00", "R$ 295,00"],
        ["Cadeira Inferior", "R$ 720,00", "R$ 360,00"],
        ["Cadeira Superior", "R$ 750,00", "R$ 375,00"],
        ["Arquibancada", "R$ 460,00", "R$ 230,00"],
        ["Soundcheck VIP Package", "R$ 2.581,00", "R$ 2.121,00"]
    ];

    // Função para atualizar a tabela de valores
    function atualizarTabela(estado) {
        valoresTabela.innerHTML = ""; // Limpa a tabela antes de adicionar novos dados

        const valores = estado === "RJ" ? valoresRJ : valoresSP;

        valores.forEach(linha => {
            const tr = document.createElement("tr");
            linha.forEach(coluna => {
                const td = document.createElement("td");
                td.textContent = coluna;
                tr.appendChild(td);
            });
            valoresTabela.appendChild(tr);
        });
    }

    // Exibe a tabela ao clicar no botão "Valores"
    document.querySelector("[data-info='valores']").addEventListener("click", function () {
        infoText.innerHTML = ""; // Garante que "undefined" não apareça
        valoresInfo.classList.remove("hidden"); // Mostra a tabela
        buttonsContainer.classList.add("hidden");
        infoContent.classList.remove("hidden");
        backButton.classList.remove("hidden");

        // Atualiza a tabela com o estado inicial selecionado
        atualizarTabela(estadoSelect.value);
    });

    // Atualiza a tabela quando o usuário muda o estado
    estadoSelect.addEventListener("change", function () {
        atualizarTabela(this.value);
    });

    // Informações dos botões
    const infoData = {
        comprar: `Os ingressos oficiais podem ser adquiridos no site da 
        <a href="https://www.ticketmaster.com.br/event/stray-kids" target="_blank" class="ticketmaster-link">TicketMaster</a> 
        ou nas bilheteiras físicas:<br>
        <ul>
            <li><strong>Rio de Janeiro:</strong> Bilheteira Sul: Rua Arquias Cordeiro, s/n - Engenho de Dentro, Rio de Janeiro - RJ, CEP:25965825 – em frente à estação Engenho de Dentro.</li>
            <li><strong>São Paulo:</strong> Avenida Ibirapuera, 3103, Indianópolis - São Paulo - SP, CEP:04029902 – Entrada pela Avenida Moaci, lateral do shopping.</li>
        </ul>`,

        digital: `Para os ingressos comprados online pelo site da TicketMaster, é necessário baixar o aplicativo Quentro em seu celular. 
        Os ingressos digitais devem ser apresentados na entrada do evento, através do aplicativo.
       Para mais informações, clique <a href="https://help.ticketmaster.com.br/hc/pt-br/articles/12683700693905-Ingresso-Digital-Quentro" target="_blank" class="ticketmaster-link">aqui</a>.`
        ,
        cuidado: "Cuidado ao comprar ingressos! Apenas a Ticketmaster e os pontos de venda oficiais garantem sua entrada no evento. A Ticketmaster não possui ferramenta de revenda e não autoriza a comercialização de ingressos fora dos canais oficiais. Fique atento para evitar golpes!"
    };

    // Função para exibir informações ao clicar nos botões
    document.querySelectorAll(".info-btn").forEach(button => {
        button.addEventListener("click", function () {
            const infoKey = this.dataset.info;

            if (infoKey === "valores") return; // O botão "Valores" já é tratado separadamente

            infoText.innerHTML = infoData[infoKey] || "Informação não disponível."; // Evita undefined
            valoresInfo.classList.add("hidden"); // Oculta a tabela se outra opção for escolhida
            buttonsContainer.classList.add("hidden");
            infoContent.classList.remove("hidden");
            backButton.classList.remove("hidden");
        });
    });

    // Botão de voltar
    backButton.addEventListener("click", function () {
        infoText.innerHTML = ""; // Limpa o texto para evitar que fique visível ao voltar
        valoresInfo.classList.add("hidden"); // Oculta a tabela, se necessário
        infoContent.classList.add("hidden");
        buttonsContainer.classList.remove("hidden");
        backButton.classList.add("hidden");
    });
    
});












let loadingTextInterval = setInterval(toggleLoadingText, 2500);

updateDisplay();
