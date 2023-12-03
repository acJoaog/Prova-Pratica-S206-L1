Feature: Testando API de Pokemon e GoRest

Background: Executa antes de cada teste
    * def url_base = "https://pokeapi.co/api/v2/"

Scenario: Testando retorno invalido
    Given url url_base
    And path "pokemon/agumon"
    When method get
    Then status 404

Scenario: Testando retorno e verificando o JSON
    Given url url_base
    And path "pokemon/zeraora"
    When method get
    Then status 200
    And match response.name == "zeraora"
    And match response.id == 807

Scenario: Testando retorno de um ataque e entrando em um dos elementos do array de pokemon que aprendem esse ataque
    Given url url_base
    And path "move/200/"
    When method get
    Then status 200
    And match response.power == 120
    And match response.learned_by_pokemon[98].name == "xerneas"

Scenario: Testando o retorno de uma habilidade e verificando um pokemon que a possua
    Given url url_base
    And path "ability/cursed-body"
    When method get
    Then status 200
    And match response.id == 130
    And match response.pokemon[10].pokemon.name == "dragapult"
    Then status 200

Scenario: Criar um novo usuário usando POST
    Given url 'https://gorest.co.in/public-api/users'
    And request { name: 'NovoUser123', gender: 'Male', email: 'novo_usuario123@test.com', status: 'Active' }
    When method post
    Then status 200