# Lojinha
Teste angularJS
> Para executar o projeto basta executar os seguintes comandos 

**ATENÇÃO** O projeto usa gulp e bower, logo é importante instala-los com `` npm -g `` antes de continuar

``git clone https://github.com/zerocowl/teste-one.git``  --clone o projeto

``npm install && bower install`` -- instale as dependencias  
`` npm start `` -- inicia o projeto no localhost:3000  
`` npm run build`` --gera o build do projeto na pasta _dist_

## Tecnologias usadas


- Nodejs (servidor JS) 
- Bower (dependencias front)
- Gulp (task runner)
- Browserify (modularizador)
- Sass (pre-processador)
- Angular (framework JS)

## Considerações

> Utilizei nodejs pelo simples fato de estar usando o gulp, foi uma opção nesse caso pelo fato dele ser mais simples, além da sua sintaxe ser mais clara, em termos de velocidade o gulp é bem mais rapido e por ser um projeto simples ele atendia todas as necessidades basicas.  
Conforme descrito no teste o objetivo era criar 3 paginas  com dados sobre pedidos, endereços e usuario, não foi espeficificado nenhuma ação em especial, por essa razão usei um modelo onde carreguei os dados atraves de arquivos json e direcionei para partials usando o router do angular.
Não me atentei muito aos detalhes da parte visual, segui um conceito simples e claro, aproveitei para usar um SASS, facilitando a manutenção e agilizando o processo de customização, em conjunto com o bootstrap.  
Usei o  _browserify_ por facilitar a componentização do projeto, o que considero fundamental pra qualquer projeto atualmente, principalmente ao trabalhar com nodejs/angular.  
Basicamente o arquivo main.js carrega todos os controllers e filters de forma bem organizada, o que facilita a manutenção do codigo.  
Por fim adicionei alguns filters e um barra de busca bem simples, dando um pouco mais de ação ao projeto,pois como disse anteriormente a espeficicação não citava uma ação em especial dentro das paginas ou entre elas.
