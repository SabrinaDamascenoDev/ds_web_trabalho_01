const FILTROS = {
  "Todos": null,
  "A ler": "Lendo",
  "Quero ler": "Quero ler",
  "Lidos": "Lido",
  "Relidos": "Relendo",
};

let livrosCache = [];
let filtroAtivo = "Todos";
let termoBusca = "";

async function carregarLivros() {
  try {
    const response = await fetch("http://localhost:3000/api/livros");
    const livros = await response.json();

    livrosCache = livros;
    renderizarLivrosLendo(livrosCache);
    aplicarFiltros();
  } catch (error) {
    console.error(error);
  }
}

function renderizarLivrosLendo(livros) {
  const container = document.getElementById("livros-lendo");
  const livrosLendo = livros.filter(livro => livro.status === "Lendo");

  container.innerHTML = livrosLendo.map(livro => {
    const porcentagem = Math.round((livro.qtd_lido / livro.qtd_paginas) * 100);

    return `
            <div class="card-lendo">
                <div class="capa-lendo">
                    <img src="${livro.capa}" alt="${livro.titulo}">
                </div>
                <div class="card-info">
                    <p class="titulo-livro">${livro.titulo}</p>
                    <p class="autor-livro">${livro.autor}</p>
                    <div class="barra-progresso">
                        <div class="progresso" style="width: ${porcentagem}%"></div>
                    </div>
                    <p class="porcentagem">${porcentagem}% concluído</p>
                </div>
            </div>
        `;
  }).join("");
}

function renderizarTodosLivros(livros) {
  const container = document.getElementById("grid-livros");

  if (livros.length === 0) {
    container.innerHTML = `<p class="sem-resultados">Nenhum livro encontrado.</p>`;
    return;
  }

  container.innerHTML = livros.map(livro => `
        <div class="card-livro" onclick="abrirEdicao(${livro.id})">
            <div class="capa-livro">
                <img src="${livro.capa}" alt="${livro.titulo}">
            </div>
            <p class="titulo-livro">${livro.titulo}</p>
            <p class="autor-livro">${livro.autor}</p>
            <span class="tag">${livro.genero}</span>
            <p class="porcentagem">${livro.status}</p>
        </div>
    `).join("");
}

function aplicarFiltros() {
  const statusFiltro = FILTROS[filtroAtivo];
  const busca = termoBusca.trim().toLowerCase();

  const livrosFiltrados = livrosCache.filter(livro => {
    const passaStatus = statusFiltro ? livro.status === statusFiltro : true;

    const passaBusca = busca
      ? [livro.titulo, livro.autor, livro.genero]
          .filter(Boolean)
          .some(campo => campo.toLowerCase().includes(busca))
      : true;

    return passaStatus && passaBusca;
  });

  renderizarTodosLivros(livrosFiltrados);
}

function configurarFiltros() {
  const botoes = document.querySelectorAll(".filtro");

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      botoes.forEach(b => b.classList.remove("ativo"));
      botao.classList.add("ativo");
      filtroAtivo = botao.textContent.trim();
      aplicarFiltros();
    });
  });
}

function configurarBusca() {
  const input = document.getElementById("busca-input");

  input.addEventListener("input", () => {
    termoBusca = input.value;
    aplicarFiltros();
  });
}

function abrirEdicao(id) {
  window.location.href = `editar-livro.html?id=${id}`;
}

configurarFiltros();
configurarBusca();
carregarLivros();