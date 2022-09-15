# redis-back


#### Antes de executar as partes do back-end é necessário definir as variáveis de ambiente utilizando o arquivo ``.env.example`` como base para a criação do ``.env``.

</br>

### Padrão utilizado

- #### Canais para envio das operações
  ##### (O nome dos canais pode ser alterado utilizando o ``.env``)

</br>

 - message - Resposta a uma mensagem de texto

    - Padrão para envio de informações:
        ````
            {
                'type': 'get',
                'message': 'a'
            }
        ````

        ##### (Solicita a resposta a uma mensagem)

        </br>

        ````
            {
                'type': 'post',
                'message': 'a',
                'response': 'b'
            }
        ````
        ##### (Adiciona a resposta a uma mensagem)

</br>

 - file - Alterações em um arquivo texto

    - Padrão para envio de informações:

        ````
            {
                'text': '123'
            }
        ````

</br>

 - function - Cálculo de uma função

    - Padrão para envio de informações:

        ````
            {
                'operation': '1+1'
            }
        ````

</br>

- #### canais de resposta as operações
  ##### (O nome dos canais pode ser alterado utilizando o ``.env``)

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

        </br>

        ````
            {
                'type': 'error',
                'channel': 'canal',
                'result': 'mensagem'
            }
        ````
        ##### (Resposta de erro)


