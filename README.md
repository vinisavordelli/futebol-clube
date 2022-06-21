# Futebol Clube
Implementação de um CRUD de uma aplicação que contem usuarios, times e partidas. A aplicação utiliza o sequelize como ORM, TypeScript como linguagem e aborda tecnologias como Express, Node, etc.

## Front-End

![front-funcionando](./img/front.gif)

## Metas do Back-End

*Meta* | *Status*
--- | :---:
35 - Desenvolver o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Minas Brasília 1 X 0 Ferroviária a tabela será atualizada | :heavy_check_mark:
34 - Desenvolver o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend e ao inserir a partida Flamengo 3 X 0 Napoli-SC a tabela será atualizada | :heavy_check_mark:
33 - Desenvolver o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do frontend com os dados iniciais do banco de dados | :heavy_check_mark:
32 - Desenvolver o endpoint /leaderboard/away de forma que seja possível filtrar a classificações dos times quando visitantes na tela de classificação do frontend e ao inserir a partida Botafogo 2 X 1 Grêmio a tabela será atualizada | :heavy_check_mark:
31 - Desenvolver o endpoint /leaderboard/away de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do frontend com os dados iniciais do banco de dados | :heavy_check_mark:
30 - Desenvolver o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend e ao inserir a partida Botafogo 2 X 1 Grêmio a tabela será atualizada | :heavy_check_mark:
29 - Desenvolver o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados | :heavy_check_mark:
28 - Desenvolver o endpoint /matches de forma que seja possível finalizar partidas em andamento | :heavy_check_mark:
27 - Desenvolver o endpoint /matches de forma que seja possível atualizar partidas em andamento | :heavy_check_mark:
26 - Desenvolver o endpoint /matches de forma que não seja possível inserir uma partida com time que não existe na tabela teams | :heavy_check_mark:
25 - Desenvolver o endpoint /matches de forma que não seja possível inserir uma partida com times iguais | :heavy_check_mark:
24 - Desenvolver o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados | :heavy_check_mark:
23 - Desenvolver o endpoint /matches de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados | :heavy_check_mark:
22 - Desenvolver testes que cubram no mínimo 80 por cento dos arquivo backend em /src com um mínimo de 100 linhas cobertas | :heavy_check_mark:
21 - Desenvolver o endpoint /matches de forma que seja possível filtrar as partidas finalizadas na tela de partidas do frontend | :heavy_check_mark:
20 - Desenvolver o endpoint /matches de forma que seja possível filtrar as partidas em andamento na tela de partidas do frontend | :heavy_check_mark:
19 - Desenvolver o endpoint /matches de forma que os dados apareçam corretamente na tela de partidas no frontend | :heavy_check_mark:
18 - Desenvolver testes que cubram no mínimo 60 por cento dos arquivo backend em /src com um mínimo de 80 linhas cobertas | :heavy_check_mark:
17 - Desenvolver o endpoint /teams/:id no backend de forma que ele possa retornar dados de um time específico | :heavy_check_mark:
16 - Desenvolver o endpoint /teams no backend de forma que ele possa retornar todos os times corretamente | :heavy_check_mark:
15 - Desenvolver testes que cubram no mínimo 45 por cento dos arquivo backend em /src com um mínimo de 70 linhas cobertas | :heavy_check_mark:
14 - Desenvolver o endpoint /login/validate no backend de maneira ele retorne os dados corretamente no frontend | :heavy_check_mark:
13 - Desenvolver o endpoint /login no backend de maneira ele não permita o acesso sem informar uma senha no frontend | :heavy_check_mark:
12 - Desenvolver testes que cubram no mínimo 30 por cento dos arquivo backend em /src com um mínimo de 45 linhas cobertas | :heavy_check_mark:
11 - Desenvolver o endpoint /login no backend de maneira ele não permita o acesso sem informar um email no frontend | :heavy_check_mark:
10 - Desenvolver testes que cubram no mínimo 20 por cento dos arquivo backend em /src com um mínimo de 35 linhas cobertas | :heavy_check_mark:
9 - Desenvolver o endpoint /login no backend de maneira ele não permita o acesso com uma senha inválida no frontend | :heavy_check_mark:
8 - Desenvolver testes que cubram no mínimo 15 por cento dos arquivo backend em /src com um mínimo de 25 linhas cobertas | :heavy_check_mark:
7 - Desenvolver o endpoint /login no backend de maneira ele não permita o acesso com um email inválido no frontend | :heavy_check_mark:
6 - Desenvolver testes que cubram no mínimo 10 por cento dos arquivo backend em /src com um mínimo de 19 linhas cobertas | :heavy_check_mark:
5 - Desenvolver o endpoint /login no backend de maneira ele permita o acesso com dados válidos no frontend | :heavy_check_mark:
4 - Desenvolver testes que cubram no mínimo 5 por cento dos arquivo backend em /src com um mínimo de 7 linhas cobertas | :heavy_check_mark:
3 - Desenvolver em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de users | :heavy_check_mark:
2 - Desenvolver em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matches | :heavy_check_mark:
1 - Desenvolver em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de teams | :heavy_check_mark:
