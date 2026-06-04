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