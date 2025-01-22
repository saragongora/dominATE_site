const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configura o diretório de arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Configura o motor de template (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Rota principal
app.get('/', (req, res) => {
    res.render('home'); // Renderiza o arquivo home.ejs
});

app.get('/dicas', (req, res) => {
    res.render('dicas'); // Renderiza o arquivo oque_levar.ejs
});


// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


