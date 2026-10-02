async function buscarUsuarios() {
    const respostaGet = await fetch("http://localhost:3000/usuarios");
    const usuarios = await respostaGet.json();
    const lista = document.getElementById("usuarios");
    
    lista.innerHTML = "";

    usuarios.forEach(usuario => {
        lista.innerHTML += `
            <div class="card-usuario">
                <div>
                    <h3>${usuario.nome}</h3>
                    <p>Idade: ${usuario.idade} anos</p>
                </div>
                
                <div class="form-edicao">
                    <input type="text" id="putNome-${usuario.id}" value="${usuario.nome}" required>
                    <input type="number" id="putIdade-${usuario.id}" value="${usuario.idade}" required>
                    <button type="button" onclick="atualizarUsuarios('${usuario.id}')">Atualizar usuário</button>
                </div>
            </div>
        `;
    });
}

async function cadastrarUsuarios(event) {
    event.preventDefault(); 

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;

    const dados = {
        nome: nome,
        idade: Number(idade)
    };

    await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    document.getElementById("formUsuario").reset(); 
    buscarUsuarios(); 
}

async function atualizarUsuarios(id) {
    const putNome = document.getElementById(`putNome-${id}`).value;
    const putIdade = document.getElementById(`putIdade-${id}`).value;

    const dados = {
        nome: putNome,
        idade: Number(putIdade)
    };

    const respostaPut = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });

    if (respostaPut.ok) {
        buscarUsuarios(); 
    }
}

document.getElementById("formUsuario").addEventListener("submit", cadastrarUsuarios);
buscarUsuarios();

console.log("Ficheiro JS carregado com sucesso!");