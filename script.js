const formulario = document.querySelector('#form')
const nome = document.querySelector('#name')
const btnMore = document.querySelector('.btn-more')
const produto = document.querySelector('.wrapper')


formulario.onsubmit = validacaoForm

function validacaoForm(event) {
    event.preventDefault()

    let temErro = false

    const inputName = document.forms['form']['name']

    if (!inputName.value) {
        temErro = true
        const span = inputName.nextSibling.nextSibling
        span.classList.remove('hidden')
        span.innerText = 'Preencha o campo nome'
    } else {
        const span = inputName.nextSibling.nextSibling
        span.classList.add('hidden')
        span.innerText = ''
    }

    const inputEmail = document.forms['form']['email']

    if (!inputEmail.value) {
        temErro = true
        const span = inputEmail.nextSibling.nextSibling
        span.classList.remove('hidden')
        span.innerText = 'Preencha o campo e-mail'
    } else {
        const span = inputEmail.nextSibling.nextSibling
        span.classList.add('hidden')
        span.innerText = ''
    }

    const inputCpf = document.forms['form']['cpf']

    
    if (!inputCpf.value || inputCpf.value.length != 11) {
        temErro = true
        const span = inputCpf.nextSibling.nextSibling
        span.classList.remove('hidden')
        span.innerText = 'Preencha o campo cpf corretamente'
    } else {
        const span = inputCpf.nextSibling.nextSibling
        span.classList.add('hidden')
        span.innerText = ''
    }

    if (temErro) {
        return
    }    

    formularioValidado()
}

function formularioValidado() {
    formulario.style.display = 'none'

    const validado = formulario.nextSibling.nextSibling

    validado.innerHTML = `<h2>Obrigado ${nome.value}, cadastro feito com sucesso!</h2>`
}

// fetch
let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'

fetch(url)
    .then(transformarEmJson)
    .then(exibirNaTela)
    .then(alimentarHtml)

function transformarEmJson(response) {
    return response.json()
}

function exibirNaTela(dados) {
    return dados
}

function alimentarHtml(dados) {
    const products = dados.products

    let htmlProdutos = ''

    for (let product of products) {
        htmlProdutos += `
            <div class="product">

                <div class="img">
                    <img src="${product.image}">
                </div>
                <p class="nome-produto">
                    ${product.name}
                </p>
                <p class="descricao-produto">
                    ${product.description}
                </p>
                <p class="preco-antigo">
                    De: R$${product.oldPrice}
                </p>
                <p class="preco-novo">
                Por: R$${product.price}
                </p>
                <p class="promocao">
                ou ${product.installments.count}x de R$${product.installments.value}
                </p>
                <button class="btn-comprar">Comprar</button>

            </div>
        `
    }

    produto.innerHTML = htmlProdutos

}



