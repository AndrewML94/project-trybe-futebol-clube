# Projeto Tryber Futebol Clube (Vigésimo quinto projeto desenvolvido)

Neste projeto fui responsável por desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados. Foi construído um back-end dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento respeitou regras de negócio providas no projeto e a API é capaz de ser consumida por um front-end já provido no projeto. Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

## Habilidades desenvolvidas

- Realização da dockerização dos apps, network, volume e compose;
- Modelagem de dados com MySQL através do Sequelize;
- Criação e associação de tabelas usando models do sequelize;
- Construção de uma API REST com endpoints para consumir os models criados;
- Construção de um CRUD com TypeScript, utilizando ORM.

## O que foi desenvolvido pelo autor

Todo o conteúdo e elementos presentes na pasta "app/backend/src" foram desenvolvidos exclusivamente por mim, representando minha contribuição integral a este projeto. É importante mencionar que os demais arquivos foram elaborados pela equipe da Trybe como parte do contexto mais amplo do projeto.

## Requisitos do projeto

### Fluxo 1: Teams

1. Desenvolver em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de times;
2. (TDD) Desenvolver testes que cubram no mínimo 5 por cento dos arquivos em /app/backend/src, com um mínimo de 7 linhas cobertas;
3. Desenvolver o endpoint /teams no back-end de forma que ele possa retornar todos os times corretamente;
4. (TDD) Desenvolver testes que cubram no mínimo 10 por cento dos arquivos em /app/backend/src, com um mínimo de 19 linhas cobertas;
5. Desenvolver o endpoint /teams/:id no back-end de forma que ele possa retornar dados de um time específico;

### Fluxo 2: Users e Login

6. Desenvolver em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de pessoas usuárias;
7. (TDD) Desenvolver testes que cubram no mínimo 15 por cento dos arquivos em /app/backend/src, com um mínimo de 25 linhas cobertas;
8. Desenvolver o endpoint /login no back-end de maneira que ele permita o acesso com dados válidos no front-end;
9. (TDD) Desenvolver testes que cubram no mínimo 20 por cento dos arquivos em /app/backend/src, com um mínimo de 35 linhas cobertas;
10. Desenvolver o endpoint /login no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end;
11. (TDD) Desenvolver testes que cubram no mínimo 30 por cento dos arquivos em /app/backend/src, com um mínimo de 45 linhas cobertas;
12. Desenvolver um middleware de validação para o token, verificando se ele é válido, e desenvolva o endpoint /login/role no back-end de maneira que ele retorne os dados corretamente no front-end;

### Fluxo 3: Matches

13. Desenvolver em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de partidas;
14. (TDD) Desenvolver testes que cubram no mínimo 45 por cento dos arquivos em /app/backend/src, com um mínimo de 70 linhas cobertas;
15. Desenvolver o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no front-end;
16. Desenvolver o endpoint /matches de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end;
17. Desenvolver o endpoint /matches/:id/finish de modo que seja possível finalizar uma partida no banco de dados;
18. Desenvolver o endpoint /matches/:id de forma que seja possível atualizar partidas em andamento;
19. (TDD) Desenvolver testes que cubram no mínimo 60 por cento dos arquivos em /app/backend/src, com um mínimo de 80 linhas cobertas;
20. Desenvolver o endpoint /matches de modo que seja possível cadastrar uma nova partida em andamento no banco de dados;
21. Desenvolver o endpoint /matches de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times;

### Fluxo 4: Leaderboard:

22. Desenvolver o endpoint /leaderboard/home de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn;
23. Desenvolver o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior;
24. Desenvolver o endpoint /leaderboard/home de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional;
25. Desenvolver o endpoint /leaderboard/away de forma que retorne as informações do desempenho dos times visitantes com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn;
26. Desenvolver o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior;
27. Desenvolver o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1;
28. Desenvolver o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados;
29. Desenvolver o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC.