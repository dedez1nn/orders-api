import express from "express";

const app = express();
const PORTA = 3000;

app.get('/', (req,res) =>{
    res.send('A home está online!')
})

app.listen(3000, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
})