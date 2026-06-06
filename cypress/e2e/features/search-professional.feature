# language: pt
@search-professional
Funcionalidade: Busca por profissionais
    @critical
    Cenário: CT-35 Buscar profissional sem preencher o campo de busca
        Dado que estou na página de busca de profissionais
        Quando submeto a busca sem preencher o campo
        Então devo visualizar a lista com todos os profissionais disponíveis
    