import express from "express";
import cors from "cors";
import { prisma } from "../src/lib/prisma.ts";

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

app.get("/usuarios", async (req, res) => {
    const usuarios = await prisma.usuarios.findMany()
    res.json(usuarios)

})  

app.post("/usuarios", async (req, res) => {
    const { nome, idade } = req.body;

    const novoUsuario = await prisma.usuarios.create({
        data: {
            nome, 
            idade: Number(idade)
        }
    });
    console.log("Novo usuário criado:", novoUsuario);
    return res.json(novoUsuario);
});

app.put("/usuarios/:id", async (req, res) => {
    const {id} = req.params
    const {nome, idade} = req.body

    const atualisarUsuarios = await prisma.usuarios.update({
        where:{
            id: Number(id)
        },
        data: {nome, idade}
    })
    res.json(atualisarUsuarios)
})

app.delete("/usuarios/:id", async (req, res) => {
    const {id} = req.params

    const deletarUsuarios = await prisma.usuarios.delete({
        where:{
            id: Number(id)
        }    
    })
    return(
        res.json(deletarUsuarios)
    )
})

app.listen(PORT, () => {
    console.log("API rodando")
})
