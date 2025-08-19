import express from "express";
import fs from "fs";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
dotenv.config();

const receitaSchema = new mongoose.Schema({
    nome: String,
    categoria: String,
    ingredientes: [String],
    instrucoes: String,
})
const connectDb = async () => {
   await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Conectado ao MongoDB");
    })
    .catch((err) => {
        console.log(err);
    })
}

connectDb();

let receitas = JSON.parse(fs.readFileSync("receitas.json", "utf8"));

app.post("/receitas", (req, res) => {
    const receita = new receitaSchema({
        nome: req.body.nome,
        categoria: req.body.categoria,
        ingredientes: req.body.ingredientes,
        instrucoes: req.body.instrucoes,
    })
    receita.save();
    res.json(receita);
})

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

app.get("/receitas/cagegoria/:categoria", (req, res)=>{
    let filtrarCategorias = receitas.filter(receita => receita.categoria == req.params.categoria);
    res.json(filtrarCategorias)
})

app.listen(PORT, () => {
    console.log(`Aberto na porta ${PORT}`);
});