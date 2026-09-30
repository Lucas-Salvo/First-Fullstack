async function buscarUsuarios() {
    const respostaGet = await fetch("http://localhost:3000/usuarios");
    const usuarios = await respostaGet.json();
    const lista = document.getElementById("usuarios");

    const btnPost = document.getElementById("btnPost")

 async function cadastrarUsuarios() {
        const nome = document.getElementById("nome").value
        const idade = document.getElementById("idade").value

        console.log(nome)
        console.log(idade)
        const dados = {nome, idade}

        const respostaPost = await fetch("http://localhost:3000/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });
    }

        document.getElementById("formUsuario").addEventListener("submit", cadastrarUsuarios);

    lista.innerHTML = "";
    
    usuarios.forEach(usuario => {
        lista.innerHTML += 
        `
            <div>
                <h3>${usuario.nome}</h3>
                <p>Idade: ${usuario.idade} anos</p>
            </div>
        `;
    });
}

buscarUsuarios();