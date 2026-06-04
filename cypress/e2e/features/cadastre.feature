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
    
    @validation
    Cenário: Validar bloqueio de cadastro com e-mails não coincidentes
        Dado que estou na página de cadastro como uma pessoa não cadastrada
        Quando preencho todos os campos obrigatórios com dados válidos
        E preencho o campo Confirmação de e-mail com um valor diferente
        Então devo visualizar uma mensagem informando que os e-mails não coincidem
        E o botão de submeter o formulário deve estar desabilitado

    @validation
    Cenário: Validar bloqueio de cadastro sem aceite dos termos de uso
        Dado que estou na página de cadastro como uma pessoa não cadastrada
        Quando preencho todos os campos obrigatórios com dados válidos
        E aceito apenas o checkbox de idade mínima
        Então o botão de submeter o formulário deve estar desabilitado

    @validation
    Cenário: Validar bloqueio de cadastro sem confirmação de idade mínima
        Dado que estou na página de cadastro como uma pessoa não cadastrada
        Quando preencho todos os campos obrigatórios com dados válidos
        E aceito apenas os termos de uso e privacidade
        Então o botão de submeter o formulário deve estar desabilitado

    @validation
    Cenário: Validar bloqueio de cadastro com confirmação de senha diferente
        Dado que estou na página de cadastro como uma pessoa não cadastrada
        Quando preencho todos os campos obrigatórios com dados válidos
        E preencho o campo Confirme sua senha com um valor diferente
        E aceito os termos nos checkboxes obrigatórios
        Então devo visualizar uma mensagem informando que as senhas não coincidem
        E o botão de submeter o formulário deve estar desabilitado

    @regression
    @validation
    Cenário: Validar bloqueio de cadastro com campos obrigatórios em branco
        Dado que estou na página de cadastro como uma pessoa não cadastrada
        Quando não preencho nenhum campo obrigatório
        Então o botão de submeter o formulário deve estar desabilitado

    @regression
    @validation
    Esquema do Cenário: Validar bloqueio de cadastro com senha "<caso>"
        Dado que estou na página de cadastro como uma pessoa não cadastrada
        Quando preencho todos os campos obrigatórios com dados válidos
        E preencho o campo Senha com "<senha>"
        E aceito os termos nos checkboxes obrigatórios
        Então devo visualizar apenas o critério de senha "<criterio>" como não atendido
        E o botão de submeter o formulário deve estar desabilitado

        Exemplos:
            | caso                   | senha            | criterio          |
            | sem letra maiúscula    | senhasegura123!  | uppercase         |
            | sem letra minúscula    | SENHASEGURA123!  | lowercase         |
            | sem número             | SenhaSegura!     | number            |
            | sem caractere especial | SenhaSegura123   | specialCharacter  |
            | sem caracteres mínimos | S1!abc4           | minLength         |