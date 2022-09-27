# Redis Back-end

## Sobre

Este é um projeto desenvolvido para a disciplina de COM242 - Sistemas Distribuídos, o projeto tem como principal objeto demonstrar o funcionamento do redis utilizando PUBLISH / SUBSCRIBE.

O Front-End do projeto se encontra nesse [repositório](https://github.com/MarcosPaul0/redis-publish-subscribe-front). 

## Tecnologias utilizadas

Foram utilizadas as seguintes tecnologias.

- [redis](https://redis.io)
- [node.js](https://nodejs.org/en/)
- [typescript](https://expressjs.com/pt-br/)
- [sequelize](https://sequelize.org)
- [docker](https://www.docker.com)

## Utilização

### Etapas

 - Realize a instalação do docker 
    - [windows](https://docs.docker.com/desktop/install/windows-install/)
    - [linux](https://docs.docker.com/desktop/install/linux-install/)

 - Realize a instalação do docker-compose (linux)
    - [docker-compose](https://docs.docker.com/compose/install/linux/)

 - Clone o repositório utilizando ```git clone https://github.com/wendel-nogueira/redis-back.git```

 - Utilize o comando ```docker-compose up -d --build```

 após realizar todas as etapas acima o docker contendo o servidor redis estará sendo executado, com isso basta selecionar o componente que deseja utilizar para executar o restante do projeto.

### Componentes

Para simular a utilização de diversas máquinas, o projeto foi divido em três pastas, sendo assim é possível utilizar apenas uma das funcionalidades caso queira.

Pastas do projeto:

- [file](./file) - Realiza a alteração em um arquivo.
- [function](./function) - Realiza uma operação matemática.
- [message](./message) - Responde a uma mensagem.

### Variáveis de ambiente

> Este projeto utiliza variáveis de ambiente para sincronizar os canais de comunicação e o servidor redis, sendo assim antes de executar qualquer um dos projetos presentes nas pastas citadas acima é necessária a atualização das variáveis de ambiente.

Inicialmente é necessário copiar o arquivo ```.env.example``` e renomeá-lo para ```.env```, feito isso basta atualizar as variáveis de ambiente alterando os valores para modificar o servidor redis e/ou os canais de comunicação.

## Padrão utilizado no projeto

O projeto utiliza um padrão de mensagens para identificar os funcionalidades e os valores passados pelos canais, sendo assim todos os padrões de mensagem se encontram abaixo, o nome dos canais pode ser diferente caso o nome deles seja alterado no ```.env```.


### canais de operações

 - message - Resposta a uma mensagem de texto

    - Padrão para envio de informações:
        ````
            {
                'type': 'get',
                'message': 'a'
            }
        ````

        ##### (Solicita a resposta a uma mensagem)

        ````
            {
                'type': 'post',
                'message': 'a',
                'response': 'b'
            }
        ````
        ##### (Adiciona a resposta a uma mensagem)

 - file - Alterações em um arquivo texto

    - Padrão para envio de informações:

        ````
            {
                'text': '123'
            }
        ````

 - function - Cálculo de uma função

    - Padrão para envio de informações:

        ````
            {
                'operation': '1+1'
            }
        ````

### canais de resposta as operações

 - response
    - Padrão das respostas:

        ````
            {
                'type': 'sucess',
                'channel': 'canal',
                'result': 'mensagem'
            }
        ````
        ##### (Resposta de sucesso)

        ````
            {
                'type': 'error',
                'channel': 'canal',
                'result': 'mensagem'
            }
        ````
        ##### (Resposta de erro)


