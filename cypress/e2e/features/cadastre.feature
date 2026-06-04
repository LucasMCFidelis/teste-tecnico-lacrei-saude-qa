# language: pt
@cadastre
Funcionalidade: Cadastro de pessoa usuária
    @critical
    Cenário: Cadastro bem-sucedido com todos os dados obrigatórios preenchidos
        Dado que estou na página de cadastro como uma pessoa não cadastrada
        Quando preencho todos os campos obrigatórios com dados válidos
        E aceito os termos nos checkboxes obrigatórios
        E submeto o formulário de cadastro
        Então devo ser redirecionada para a página de confirmação de cadastro
    
    @critical
    @validation
    Cenário: Validar bloqueio de cadastro com e-mail já cadastrado na plataforma
        Dado existe uma conta cadastrada com o e-mail "teste@email.com"
        E que estou na página de cadastro como uma pessoa não cadastrada
        Quando preencho todos os campos obrigatórios com dados válidos
        E preencho os campos "E-mail" e "Confirmação de e-mail" com "teste@email.com"
        E aceito os termos nos checkboxes obrigatórios
        E submeto o formulário de cadastro
        Então devo permanecer na página de cadastro
        E devo visualizar uma mensagem informando que o e-mail já está em uso

    @validation
    Cenário: Validar bloqueio de cadastro com e-mail em formato inválido
        Dado que estou na página de cadastro como uma pessoa não cadastrada
        Quando preencho todos os campos obrigatórios com dados válidos
        E preencho o campo "E-mail" com um e-mail em formato inválido
        Então devo visualizar a mensagem de e-mail inválido no campo E-mail
        E o botão de submeter o formulário deve estar desabilitado