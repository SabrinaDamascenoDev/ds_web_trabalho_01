const form = document.getElementById("form-livro");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const livro = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        genero: document.getElementById("genero").value,
        qtd_paginas: Number(document.getElementById("paginas").value),
        status: document.getElementById("status").value,
        capa: document.getElementById("capa").value,
        qtd_lido:
        document.getElementById("status").value === "Lendo"
            ? Number(document.getElementById("qtd_lido").value)
            : null
    };

    try {
        const response = await fetch(
            "http://localhost:3000/api/livros",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(livro)
            }
        );

        const data = await response.json();

        alert("Livro cadastrado com sucesso!");

        form.reset();

        console.log(data);
    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar livro");
    }
});

const statusSelect = document.getElementById("status");
const campoQtdLido = document.getElementById("campo-qtd-lido");

function atualizarCampoQtdLido() {
    campoQtdLido.style.display =
        statusSelect.value === "Lendo"
            ? "block"
            : "none";
}

statusSelect.addEventListener("change", atualizarCampoQtdLido);

atualizarCampoQtdLido();