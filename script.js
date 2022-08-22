const formulario = document.querySelector('#form')
const nome = document.querySelector('#name')
const btnMore = document.querySelector('.btn-more')
const produto = document.querySelector('.wrapper')
const form2 = document.querySelector('#form-compartilhar')


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
        inputName.style.border = '1px solid red'
    } else {
        const span = inputName.nextSibling.nextSibling
        span.classList.add('hidden')
        span.innerText = ''
        inputName.style.border = '1px solid #707070'
    }

    const inputEmail = document.forms['form']['email']
    if (!inputEmail.value) {
        temErro = true
        const span = inputEmail.nextSibling.nextSibling
        span.classList.remove('hidden')
        span.innerText = 'Preencha o campo e-mail'
        inputEmail.style.border = '1px solid red'
    } else {
        const span = inputEmail.nextSibling.nextSibling
        span.classList.add('hidden')
        span.innerText = ''
        inputEmail.style.border = '1px solid #707070'
    }

    const inputCpf = document.forms['form']['cpf']
    if (!inputCpf.value || inputCpf.value.length != 11) {
        temErro = true
        const span = inputCpf.nextSibling.nextSibling
        span.classList.remove('hidden')
        span.innerText = 'Preencha o campo cpf corretamente'
        inputCpf.style.border = '1px solid red'
    } else {
        const span = inputCpf.nextSibling.nextSibling
        span.classList.add('hidden')
        span.innerText = ''
        inputCpf.style.border = '1px solid #707070'
    }

    if (temErro) {
        return
    }    
    
    const formTarget = event.target

    formularioValidado(formTarget)
}

function formularioValidado(formTarget) {

    formTarget.style.display = 'none'

    const validado = formTarget.nextSibling.nextSibling
    if (formTarget.id === 'form') {
        validado.innerHTML = `<h2>Obrigado ${nome.value}, cadastro feito com sucesso!</h2>`
    } else {
        validado.innerHTML = `<h2>Obrigado, o email foi enviado com sucesso!</h2>`
    }
}


let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1'

fetch(url)
    .then(transformarEmJson)
    .then(alimentarHtml)
    .catch(error => console.log('erro: ' + error))

function transformarEmJson(response) {
    return response.json()
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

    btnMore.onclick = function () {
        
        
        fetch(`https://${dados.nextPage}`)
            .then(transformarEmJson)
            .then(alimentarHtml)
            .catch(error => console.log(error))

    }
}







form2.onsubmit = validacaoForm2

function validacaoForm2(event) {
    event.preventDefault()

    let temErro = false
    
    const inputFriend = document.forms['form-compartilhar']['friend']
    if (!inputFriend.value) {
        temErro = true
        const span = inputFriend.nextSibling.nextSibling
        span.classList.remove('hidden')
        span.innerText = 'preencha o nome do amigo antes de confirmar'
        inputFriend.style.border = '1px solid red'
    } else {
        const span = inputFriend.nextSibling.nextSibling
        span.classList.add('hidden')
        span.innerText = ''
        inputFriend.style.border = '1px solid #707070'
    }

    const inputEmail = document.forms['form-compartilhar']['friend-email']
    if (!inputEmail.value) {
        temErro = true
        const span = inputEmail.nextSibling.nextSibling
        span.classList.remove('hidden')
        span.innerText = 'preencha o nome do amigo antes de confirmar'
        inputEmail.style.border = '1px solid red'
    } else {
        const span = inputEmail.nextSibling.nextSibling
        span.classList.add('hidden')
        span.innerText = ''
        inputEmail.style.border = '1px solid #707070'
    }

    if(temErro) {
        return
    }

    const formTarget = event.target

    formularioValidado(formTarget)
} 