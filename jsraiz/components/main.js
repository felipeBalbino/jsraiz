const produtos = [
{
    id:1,
    nome : 'JSRaiz para FW',
    preco: 430,
    descricao : 'O melhor curso do mundo',
    imagem: 'http://lorempixel.com/500/300/'
},
{
    id:2,
    nome : 'JSRaiz para FW',
    preco: 60,
    descricao : 'O melhor curso do mundo',
    imagem: 'http://lorempixel.com/500/300/'
},
{
    id:3,
    nome : 'JSRaiz para FW',
    preco: 50,
    descricao : 'O melhor curso do mundo',
    imagem: 'http://lorempixel.com/500/300/'
},
{
    id:4,
    nome : 'JSRaiz para FW',
    preco: 330,
    descricao : 'O melhor curso do mundo',
    imagem: 'http://lorempixel.com/500/300/'
}];

const carrinhosItens = {};

function renderizaProduto(produto, index){
    return `<div class="col-sm-4 mb-3">
    <div class="card">
        <div class="card loja_item">
            <img src="${produto.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${produto.nome}</h5>
                <small>R$${produto.preco}</small>
                <p class="card-text">${produto.descricao}</p>
                <button data-index=${index} class="btn btn-primary btn-add">Adicionar</a>
            </div>
        </div>
    </div>
</div>`
}

function renderizaProdutos(){
    let html = '';
    //refatorar para map
    for(let i=0; i < produtos.length; i++){
      html = html + renderizaProduto(produtos[i], i)
    }
    return html;
}

function renderizaItemCarrinho(produtoCarrinho){
return  `<div class="card carrinho_item">
            <div class="card-body">
                <h5 class="card-title">${produtoCarrinho.nome}</h5>
                <p class="card-text">Preço unidade: R$${produtoCarrinho.preco} | Quantidade: ${produtoCarrinho.quantidade}</p>
                <p class="card-text">Valor: R$${produtoCarrinho.preco * produtoCarrinho.quantidade}</p>
                <button data-id=${produtoCarrinho.id} class="btn btn-danger btn-sm btn-remove">Remover</a>
            </div>
        </div>`
}


function renderizaTotal(total){
    return  `<h6>Total: <strong>R$${total}</strong></h6>`
    }

function renderizaCarrinho(){
    let html = '';
    for(let produtoId in carrinhosItens){
        html =  html + renderizaItemCarrinho(carrinhosItens[produtoId]);
    }
    document.querySelector('.carrinho_itens').innerHTML = html;
}

function calculaTotal(){
    let total = 0;
    for(let produtoId in carrinhosItens){
        total =  total + (carrinhosItens[produtoId].preco * carrinhosItens[produtoId].quantidade);
    }
    
    document.querySelector('.carrinho_total').innerHTML = renderizaTotal(total);
}

function adicionaItemNoCarrinho(produto){
    if(!carrinhosItens[produto.id] ){
        carrinhosItens[produto.id] = produto;
        carrinhosItens[produto.id].quantidade = 0;
    }
    ++carrinhosItens[produto.id].quantidade;
    renderizaCarrinho();
    calculaTotal();
}

function removerItemNoCarrinho(produto){
    if(carrinhosItens[produto.id].quantidade <= 1 ){
        delete carrinhosItens[produto.id];
    }else{
        carrinhosItens[produto.id].quantidade = carrinhosItens[produto.id].quantidade--;
    }
    renderizaCarrinho();
    calculaTotal();
}

document.body.addEventListener('click', function(addEventListener){
   const elemento =  event.target;
   if(elemento.classList.contains('btn-add')){
        const index = parseInt(elemento.getAttribute("data-index"), 10);
        const produto = produtos[index];
        adicionaItemNoCarrinho(produto);
   }

    if(elemento.classList.contains('btn-remove')){
        const index = parseInt(elemento.getAttribute("data-id"), 10);
        removerItemNoCarrinho(produtos[index]);
   }
});


document.querySelector('.loja').innerHTML = renderizaProdutos();
