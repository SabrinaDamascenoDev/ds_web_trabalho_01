const API_URL = "http://localhost:3000/api/livros";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const form = document.getElementById("form-livro");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const generoInput = document.getElementById("genero");
const paginasInput = document.getElementById("paginas");
const statusSelect = document.getElementById("status");
const campoQtdLido = document.getElementById("campo-qtd-lido");
const qtdLidoInput = document.getElementById("qtd_lido");
const capaInput = document.getElementById("capa");
const btnDeletar = document.getElementById("btn-deletar");

function atualizarCampoQtdLido() {
  const exibir = ["Lendo", "Relendo", "Abandonei"].includes(statusSelect.value);
  campoQtdLido.style.display = exibir ? "block" : "none";
  if (!exibir) qtdLidoInput.value = "";
}

async function carregarLivro() {
  if (!id) {
    alert("Nenhum livro selecionado para edição.");
    window.location.href = "./inicio.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Livro não encontrado");

    const livro = await response.json();

    tituloInput.value = livro.titulo ?? "";
    autorInput.value = livro.autor ?? "";
    generoInput.value = livro.genero ?? "";
    paginasInput.value = livro.qtd_paginas ?? "";
    statusSelect.value = livro.status ?? "Lendo";
    qtdLidoInput.value = livro.qtd_lido ?? "";
    capaInput.value = livro.capa ?? "";

    atualizarCampoQtdLido();
  } catch (error) {
    console.error("Erro ao carregar livro:", error);
    alert("Não foi possível carregar os dados do livro.");
  }
}

statusSelect.addEventListener("change", atualizarCampoQtdLido);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const livroAtualizado = {
    titulo: tituloInput.value.trim(),
    autor: autorInput.value.trim(),
    genero: generoInput.value.trim(),
    qtd_paginas: Number(paginasInput.value) || 0,
    status: statusSelect.value,
    qtd_lido: Number(qtdLidoInput.value) || 0,
    capa: capaInput.value.trim(),
  };

  if (!livroAtualizado.titulo || !livroAtualizado.autor) {
    alert("Preencha pelo menos o título e o autor do livro.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(livroAtualizado),
    });

    if (!response.ok) throw new Error("Falha ao atualizar o livro");

    alert("Livro atualizado com sucesso!");
    window.location.href = "./inicio.html";
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    alert("Não foi possível atualizar o livro.");
  }
});

btnDeletar.addEventListener("click", async () => {
  if (!id) return;

  const confirmar = confirm("Deseja realmente deletar este livro?");
  if (!confirmar) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Falha ao deletar o livro");

    alert("Livro removido com sucesso!");
    window.location.href = "./inicio.html";
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    alert("Não foi possível deletar o livro.");
  }
});

carregarLivro();