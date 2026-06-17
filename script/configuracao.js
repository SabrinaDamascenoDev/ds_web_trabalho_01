async function carregarUsuario() {
    const resposta = await fetch("http://localhost:3000/api/usuario");
    const usuario = await resposta.json();

    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("numero").value = usuario.numero;
}

async function salvarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const numero = document.getElementById("numero").value;

    await fetch("http://localhost:3000/api/usuario", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, numero })
    });

    alert("Dados salvos com sucesso!");
}

document.addEventListener("DOMContentLoaded", () => {
    carregarUsuario();

    const formulario = document.querySelector("#panel-dados form");
    formulario.addEventListener("submit", salvarUsuario);
});