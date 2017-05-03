# Pixel
## TODO
  - slides home
  - nav bar logado
  - carrinho (habilitar o nav bar resolve)
  - criar json resgates
  - salvar em local storage



> ## ROTA  => PRODUTO

**POST** --> `api/cliente/catalogos ` =>  retorna todos os catalogos de uma cliente com base no ID e do catalogo [*tipo de catalogo*]  
**POST** --> `api/cliente/catalogo/produtos` => retorna todos os produtos com base no catalogo e tipo  
**POST** --> `api/cliente/catalogo/produtos/departamento` =>  retorna todos os produtos do departamento com base no catologo  
**POST** --> `api/cliente/produto/` => retorna todos os dados do produto com base no catalogo  
**POST** --> `api/cliente/produto/tipo` => retorna todos os produtos com base no tipo(eletrodomestico/casa/jardim)  
>> **Modelo retorno produto**
```{
    "produto": [{
        "catalogoId": 12,
        "id": 1,
        "departamentos": [
            "cozinha",
            "casa"
        ],
        "descricao": "panelas",
        "estoque": "10",
        "lojaId": 3,
        "opcoes": [{
            "cor": [
                "preta",
                "branca"
            ],
            "tamanho": [
                "normal"
            ]
        }],
        "preco": 110.2,
        "sku": "233",
        "srcImg": "/panela.jpg"
    }]
}
```

> ## ROTA => USUARIO 
**POST** --> `api/cliente/usuarios` => retorna os usuarios com base no cliente  
**POST** --> `api/cliente/usuario` => retorna os dados de um usuario com base no __ID/login/email__  
**POST** --> `api/cliente/usuario/endereço` =>retorna os endereços de um usuario com base no ID  
**POST** --> `api/usuario/reset` => reseta a senha de um usuario e retorna a nova senha com base no ID  
**POST** --> `api/usuario/perfil` => retorna o tipo do usuario com base no ID

>> **Modelo retorno usuario**
```
{
    "usuario": {
        "dataNasc": "1990-01-01T02:00:00.000Z",
        "idCliente": 3,
        "nome": "jose",
        "saldo": 123000,
        "sobrenome": "padilha",
        "status": "ativo",
        "tipo": 1
    }
}
```

> ## ROTA => CHECKOUT 
**POST** --> `api/checkout/resgate` => recebe os dados do resgate e retorna um status ``{usuario, produtos, datas, endereço, ip}`` => status  
**POST** --> `api/checkout/resgate/status` => altera o status de um resgate com base no ID [liberado]  
**POST** --> `api/checkout/resgate/usuario` => retorna os resgates e seus status com base no usuario  {resgates}  
**POST** --> `api/checkout/resgate/cliente` => retorna os resgates e seus status com base no ID da cliente {resgates}  

```
{
    "resgate": {
        "idCliente": 1,
        "catalogoId": 1,
        "clienteId": 1,
        "dataSolicitacao": "2017-12-01T02:00:00.000Z",
        "lojaId": 3,
        "produto": [{
                "id": 1,   
                "sku": "1"
            },
            {
                "id": 4,
                "sku": "2"
            }
        ]
    }
}
```
 