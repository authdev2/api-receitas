import express from "express";
import fs from "fs";

const app = express();

const PORT = 3000;
app.use(express.json());

let receitas = JSON.parse(fs.readFileSync("receitas.json", "utf8"));

app.get("/receitas", (req, res) => {
    res.json(receitas);
});

app.get("/receitas/random", (req, res) => {
    let randomIndex = Math.floor(Math.random() * receitas.length);
    res.json(receitas[randomIndex]);
})

app.get("/receitas/:categoria", (req, res) => {
    let receitasFiltradas = receitas.filter(receita => receita.categoria === req.params.categoria);
    res.json(receitasFiltradas);
})

app.get("/receitas/searchCompleta/:nome", (req, res) => {
    let receitasFiltradas = receitas.filter(receita => receita.nome.toLowerCase().includes(req.params.nome.toLowerCase()));
    res.json(receitasFiltradas);
})

app.listen(PORT, () => {
    console.log(`Aberto na porta ${PORT}`);
});