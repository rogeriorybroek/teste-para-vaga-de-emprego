const formulario = document.querySelector('#form')

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

    

    if (!temErro) {
        formulario.submit()
    }    
}