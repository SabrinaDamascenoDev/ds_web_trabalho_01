async function carregarLivros() {
    try {
        const response = await fetch(
            "http://localhost:3000/api/livros"
        );

        const livros = await response.json();

        renderizarLivrosLendo(livros);
        renderizarTodosLivros(livros);

    } catch (error) {
        console.error(error);
    }
}

function renderizarLivrosLendo(livros) {

    const container = document.getElementById("livros-lendo");

    const livrosLendo = livros.filter(
        livro => livro.status === "Lendo"
    );

    container.innerHTML = livrosLendo.map(livro => {

        const porcentagem = Math.round(
            (livro.qtd_lido / livro.qtd_paginas) * 100
        );

        return `
            <div class="card-lendo">

                <div class="capa-lendo">
                    <img src="${livro.capa}" alt="${livro.titulo}">
                </div>

                <div class="card-info">

                    <p class="titulo-livro">
                        ${livro.titulo}
                    </p>

                    <p class="autor-livro">
                        ${livro.autor}
                    </p>

                    <div class="barra-progresso">
                        <div
                            class="progresso"
                            style="width: ${porcentagem}%"
                        ></div>
                    </div>

                    <p class="porcentagem">
                        ${porcentagem}% concluído
                    </p>
                </div>

            </div>
        `;
    }).join("");
}
function renderizarTodosLivros(livros) {

    const container = document.getElementById("grid-livros");

    container.innerHTML = livros.map(livro => `
        <div class="card-livro">

            <div class="capa-livro">
                <img src="${livro.capa}" alt="${livro.titulo}">
            </div>

            <p class="titulo-livro">
                ${livro.titulo}
            </p>

            <p class="autor-livro">
                ${livro.autor}
            </p>

            <span class="tag">
                ${livro.genero}
            </span>

            <p class="porcentagem">
                ${livro.status}
            </p>

        </div>
    `).join("");
}

carregarLivros();