# Sobre a Aplicação

A aplicação foi construida utilizando a stack MERN, mongoDb como banco de dados, React.js para o Front-End e Node.js com express para o Back-End. 

Para rodar a aplicação localmente entre na pasta client e rode 
      
      npm install
      npm run start

Entre na pasta server e rode

      npm install
      npm run start

A aplicação Front-End roda na porta 3000 e a backend na rota 5000

# Aplicação no heroku
Foi utilizada a documentação do heroku sobre node.js e react.js para fazer as modificações necessárias para rodar em produção. Ex: nodemoon não funciona no heroku 

A aplicação Front-End pode ser acessada na página: https://agile-castle-06660.herokuapp.com/

A aplicação Back-End pode ser acessada na página: https://salty-anchorage-93388.herokuapp.com/api/player/

## Sobre o Back
Métodos permitidos:
### GET :
- /api/pokemons/ -> adiciona todos os pokemons de Kanto para o banco de dados.
- /api/pokemons/pokeapi -> lista todos os pokemons no banco de dados
- /api/player/ -> lista todos os players no banco de dados

### POST:
- /api/player/ -> cria um novo player passando "name":"somename" pelo body. Os players são setados inicialmente com 1 pokemon de cada na base de dados.
- /api/player/add -> responsável pela lógica de troca, adiciona os pokemons que o player recebeu e retira o que estão sendo dados


## Sobre o Front
É possível realizar a troca de até 6 pokemons, podendo selecionar vários iguais, a troca é realizada quando a diferença entre as baseExperience dos dois jogadores 
é  menor que 30. Adicionar mais de um pokemon igual não modifica o valor do baseExperience.
Uma troca fácil de ser realizada é entre a Kakuna e o Metapod pois ambos tem a mesma baseExperience.
Após a troca o botão para realizar nova troca aparecerá.
