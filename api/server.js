import express from "express";
const app = express();

const PORT = 3000;
app.use(express.json());

let receitas = [
    {
        id: 1,
        nome: "Pizza",
        ingredientes: ["farinha", "água", "fermento", "sal", "azeitona", "queijo", "molho de tomate"],
        modoPreparo: "Misturar todos os ingredientes e assar em forno a 200°C por 30 minutos.",
        tempoPreparo: 30,
        rendimento: 8,
        categoria: "Fast Food",
    }
];

app.get("/receitas", (req, res) => {
    res.json(receitas);
});

app.post("/receitas", (req, res) => {
    const receita = req.body;
    receitas.push(receita);
    res.status(201).json(receita);
});

app.listen(PORT, () => {
    console.log(`Aberto na porta ${PORT}`);
});