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

async function alterarSenha(event) {
    event.preventDefault();

    const senhaAtual = document.getElementById("senha-atual").value;
    const novaSenha = document.getElementById("nova-senha").value;
    const confirmarSenha = document.getElementById("conf-senha").value;

    const resposta = await fetch("http://localhost:3000/api/usuario/senha", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            senhaAtual,
            novaSenha,
            confirmarSenha
        })
    });

    const resultado = await resposta.json();

    alert(resultado.mensagem);

    if (resultado.sucesso) {
        document.getElementById("senha-atual").value = "";
        document.getElementById("nova-senha").value = "";
        document.getElementById("conf-senha").value = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarUsuario();

    const formularioDados = document.querySelector("#panel-dados form");
    formularioDados.addEventListener("submit", salvarUsuario);

    const formularioAcesso = document.querySelector("#panel-acesso form");
    formularioAcesso.addEventListener("submit", alterarSenha);

    const botaoSair = document.querySelector(".signout-btn");

    botaoSair.addEventListener("click", () => {
        const confirmar = confirm("Deseja realmente sair?");

        if (confirmar) {
            window.location.replace("login.html");
        }
    });
});