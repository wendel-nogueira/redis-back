# redis-back

- canais (subcribe):

  - message: resposta a uma mensagem de texto

    ````
    {
        "type": "get",
        "message": "a"
    }
    ````
    (solicita uma resposta)


    ````
    {
        "type": "set",
        "message": "a",
        "response": "b"
    }
    ````
    (adiciona uma resposta para a mensagem)

  - archive: alterações em um arquivo texto

    ````
    {
        "type": "add",
        "text": "a"
    }
    ````
    (adiciona o texto ao arquivo)

    ````
    {
        "type": "remove",
        "text": "a"
    }
    ````
    (remove o texto do arquivo)

  - function: cálculo de uma função

    ````
    {
        "operation": "1+1"
    }
    ````
    (realiza a conta)

- canais (publish):

  - message-response:

  - archive-response:

  - function-response: