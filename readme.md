# Intruções para rodar o projeto

#### Pré-requesitos:

    - Docker + docker desktop ou postgreSQL instalados

    Obs: Se você tiver os dois instalados e quiser usar o docker, pode dar erro ao executar o container por causa da porta em comum, mas é fácil corrigir.

#### Pré-requesitos 2.0:
    
    - Pegue o .env do front e do back no trello e coloque em suas respectivas pastas do projeto

    Obs. Nunca suba o .env do projeto para github (repositório remoto)

### Com docker:

D1 - Para subir o container

    - (primeira vez) Na pasta raiz digite no terminal:

      ~ docker-compose up -d 

    Obs: algumas instalações do docker o comando vai ser "docker compose up -d"

    - (Depois da primeira) Suba o container pelo docker desktop ou digite no terminal: 

      ~ docker start web-site_do_ramo-db 

    - A fim de parar o container use:

      ~ docker stop web-site_do_ramo-db

    Obs: em algumas situações talvez precise trocar o nome do container por 'web-site_do_ramo-db-1'

D2 - Entrar no container
    
    - Na pasta raiz digite no terminal: 
      ~ docker exec -it 'web-site_do_ramo-db' bash ou
      
    Obs: em algumas situações talvez precise trocar o nome do container por 'web-site_do_ramo-db-1'
    
D3 - Entrar no banco de dados e criar o banco:

    - Digite para entrar no container: 
       ~ psql -U postgres

    - Digite para criar o banco de dados:
       ~ CREATE DATABASE sitedoramo;
    
    - Digite para sair do container e do banco de dados (digitar mais de uma vez):
       ~ exit 



### Com postgreSQL: 

P1 - No .env do projeto vai colocar trocar as variaveis a seguir pelo correspondente ao seu banco na maquina

    DATABASE_USERNAME=username_do_seu_banco-de-dados
    DATABASE_PASSWORD=senha_do_seu_banco-de-dados

P2 - Crie o banco de dados, da forma que preferir, usando linha de comando ou interface gráfica, o nome tem que ser 'sitedoramo'



### Geral: 

1 - Entre no backend e use o seguinte comando para intalar as dependências do node e manter-se atualizado: 

    ~ yarn

2 - Rode as migrations e os seeders

    ~ yarn knex migrate:latest
    ~ yarn knex seed:run

3 - Enfim, execute o backend:

    ~ yarn dev

### Se precisar rodar o frontend também: 

4 - Abra um outro terminal, entre no frontend e use o seguinte comando para intalar as dependências do node e manter-se atualizado: 

    ~ yarn

5 - Enfim, execute o frontend:

    ~ yarn dev


6 - Dúvidas ou precisa de ajuda : 

    Dê o seu jeito, chatGPT, google por último fale comigo, vulgo Antonio.


#### Obs. 
    
    Não precisa fazer todos esses passos toda vez que for rodar o software.
    Apenas o D1 (caso esteja usando docker), 3 e 5. caso precise fazer alguma coisa a mais será informado no grupo da web.

