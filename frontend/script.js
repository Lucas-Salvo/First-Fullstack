async function buscarUsuarios() {
    const resposta = await fetch("http://localhost:3000/usuarios");
    const usuarios = await resposta.json();
    const lista = document.getElementById("usuarios");

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