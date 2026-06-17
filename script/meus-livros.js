console.log("Meus Livros carregado!");

async function carregarLivros(filtro = "Todos") {
    const grid = document.getElementById("grid-livros");
    grid.innerHTML = "";

    try {
        const resposta = await fetch("http://localhost:3000/api/livros");
        const livros = await resposta.json();

        const filtrados = filtro === "Todos"
            ? livros
            : livros.filter(l => l.status === filtro);

        if (filtrados.length === 0) {
            grid.innerHTML = "<p style='color:#aaa'>Nenhum livro encontrado.</p>";
            return;
        }

        filtrados.forEach(livro => {
            const card = document.createElement("div");
            card.className = "card-livro";
            card.innerHTML = `
                <div class="capa-livro">
                    ${livro.capa
                        ? `<img src="${livro.capa}" alt="${livro.titulo}">`
                        : `<div style="width:100%;height:100%;background:#e9ecef;display:flex;align-items:center;justify-content:center;color:#aaa;font-size:0.8rem;">Sem capa</div>`
                    }
                </div>
                <span class="titulo-livro">${livro.titulo}</span>
                <span class="autor-livro">${livro.autor}</span>
                <span class="tag">${livro.genero}</span>
                <span style="font-size:0.72rem;color:#aaa;text-align:right;margin-top:auto">${livro.status}</span>
            `;
            grid.appendChild(card);
        });

    } catch (erro) {
        console.error("Erro ao buscar livros:", erro);
        grid.innerHTML = "<p style='color:red'>Erro ao conectar com o servidor.</p>";
    }
}

document.querySelectorAll(".filtro").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".filtro").forEach(b => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        carregarLivros(btn.dataset.status);
    });
});

carregarLivros();