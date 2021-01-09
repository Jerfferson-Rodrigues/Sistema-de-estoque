function validarproduto(idnomeproduto, idcodproduto, idqtdproduto){
    let nome = document.getElementById(idnomeproduto).value;
    let codigo = document.getElementById(idcodproduto).value;
    let qtd = document.getElementById(idqtdproduto).value;

    if(nome == ""){
        alert("Nome do produto vazio. POR FAVOR! preencha");
    }else if(codigo == ""){
        alert("Código do produto vazio. POR FAVOR! preencha");
    }else{ 
        cadastrarProduto(nome, codigo, parseInt(qtd))
    }
}

function cadastrarProduto(produto, cod, qtd){
    let novoproduto = {nome:produto, codigo:cod, quantidade:qtd};

    if(typeof(Storage) !== "undefined"){
        let produtos = localStorage.getItem("produtos");
        if(produtos == null){
            produtos =[];
        }
        else{
            produtos = JSON.parse(produtos);
            produtos.push(novoproduto);
            localStorage.setItem("produtos",JSON.stringify(produtos))
            alert("Foram cadastradas com sucesso "+qtd+" unidades do produto "+ produto+"!");
            atualizarTotalEstoque("totalEstoque");
            location.reload();
        }   
    }else{
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}

function atualizarTotalEstoque(idcampo){
    localStorage.setItem("totalEstoque",++document.getElementById(idcampo).innerHTML)
}

function carregarTotalEstoque(idcampo){
    if (typeof(Storage) !== "undefined"){
        let totalEstoque = localStorage.getItem("totalEstoque");
        if(totalEstoque == null) totalEstoque = 0;
        document.getElementById(idcampo).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

function listarEstoque() {
    if (typeof(Storage) !== "undefined"){
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Estoque:</h1>")
        if (produtos == null){
            document.write("<h3>Ainda não há nenhum item no estoque</h3>")
        }
        else{
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Nome do produto: "+produto.nome+"</li>");
                document.write("<li>Código do produto: "+produto.codigo+"</li>");
                document.write("<li>Quantidade no estoque: "+produto.quantidade+"</li>");
                document.write("</ul>")
            });
        }
    }
    else{
        alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
    }
}