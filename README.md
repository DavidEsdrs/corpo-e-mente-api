# Schedule API
## Descrição
<p>
API que oferece serviços de agendamento de consultas. Os dados do agendamento serão persistidos num banco de dados SQLite. Estes dados podem ser manipulados por usuários administradores e acompanhados por quem agendou.
</p>

## Status do projeto
Em construção

## Features
### Para clientes
<ul>
    <li>
        Cadastro de usuário
    </li>
    <li>
        Agendamento de consulta
    </li>
    <li>
        Manipulaçao do estado da consulta
    </li>
</ul>

### Para administradores
<ul>
    <li>
        Deletar todos os agendamentos
    </li>
    <li>
        Ver todo o cronograma de agendamento
    </li>
    <li>
        Mudar o estado de qualquer agendamento (Cancelar, por exemplo)
    </li>
</ul>

## Tecnologias utilizadas
<ul>
    <li>
        TypeScript    
    </li>
    <li>
        SQLite
    </li>
    <li>
        TypeORM    
    </li>
    <li>
        Class-transformer
    </li>
    <li>
        JsonWebToken
    </li>
    <li>
        Express
    </li>
    <li>
        BcryptJS
    </li>
</ul>

## Requisitos para testar a API
Tenha instalado na sua máquina o NodeJS versão 12 ou mais atual.
Tenha também instalado um software como Postman ou Insomnia (há também a extensão Thunder Client, do Visual Studio Code) para vizualizar as respostas de cada rota da api. Todos os comando apresentados abaixo podem ser feitos pelo terminal integrando do VS Code.

## Passo a passo de como utilizar
1. O primeiro passo é instalar todos módulos utilizados no projeto. Para isso, utilize o comando `node install` ou `yarn add` para as baixar e instalar.

2. Rode o comando `npm run migration:run` ou `yarn migration:run` para rodar todas as migrations e criar o banco de dados do projeto.

3. Rode o comando `npm run dev` ou `yarn dev` para iniciar o servidor da api e agora ela está pronta para ser utilizada :)

O servidor é aberto em `localhost:3000/`. 
> Dica: Comece criando um novo usuário pela rota `localhost:3000/user/new`

## Esquema do banco de dados
O banco de dados tem duas tabelas, sendo elas `schedules` e `users`, representando os agendamentos e os usuários, respectivamente. Elas têm os seguintes esquemas:

<table>
    <thead>Schedules</thead>
    <th>id <strong style="color: yellow">PK</strong> </th>
    <th>applicant <strong style="color: yellow">FK</strong></th>
    <th>scheduled_date</th>
    <th>situation</th>
    <th>created_at</th>
    <th>updated_at</th>
</table>

<table>
    <thead>Users</thead>
    <th>id <strong style="color: yellow">PK</strong></th>
    <th>name</th>
    <th>email</th>
    <th>password</th>
    <th>admin</th>
    <th>created_at</th>
    <th>updated_at</th>
</table>

O id é a primary key de ambos e utilizado para recuperar as informações de uma entidade (cada linha da tabela, a grosso modo) de forma mais rápida. Na tabela, `schedules` há o campo `applicant`, que representa que fez o agendamento. Ele é uma Foreign Key da tabela de usuários, isto é, representa uma entidade na tabela de usuários.

## Utilizando as rotas
Todos os json a seguir podem ser adicionados no campo Body > Json Content da aplicação de sua preferência (Postman ou Insomnia).

Acesse a rota `localhost:3000/user/new` com o método `POST` para criar um novo usuário, essa rota recebe o seguinte objeto Json:
```json
{
    "name": "Cool Name",
    "email": "coolname@email.com",
    "password": "coolpassword",
    "admin": false
}
```

A api criará uma nova entidade no banco de dados representando esse usuário. Além dos campos acima, também serão adicionados os campos `created_at` e `updated_at`

Após criar esta nova conta no banco de dados, está na hora de logar para ter acesso a outros recursos da api. Para isso, acesse a rota `localhost:3000/login` com o método `POST`, que recebe o seguinte:
```json
{
    "email": "coolname@email.com",
    "password": "coolpassword"
}
```

A API irá preencher os headers de todas as próximas requisições do cliente pelas próximas 24 horas. Em outras palavras, em produção, o cliente não iria precisar logar de novo para cada requisição feita. No nosso caso, a API devolve um `token` gerado pelo `json web token` para utilizar as rotas que precisam de autorização, isto é, de um usuário logado. Você poderá colar este token em `bearer` em `authorization` no, software utilizado, em cada rota. 

Vamos criar nosso primeiro agendamento, para isso, acesse a rota `localhost:3000/user/schedules/new` com o método `POST`. A rota recebe o seguinte json:
```json
{
    "scheduled_date": "2021-12-11T11:00:00.000Z",
    "situation": "scheduled"
}
```
O parâmetro `scheduled_date` representa a data agendada. Um agendamento válido não pode ser marcado para antes da data atual e apenas aos sábados às 8 ou 11. Isso pode ser facilmente mudado pelo método `isValidDate()` situado em `src/utils/isValidDate.ts`. A data deve estar no formato `YYYY-MM-DDThh:mm:sssZ`.

O parâmetro `situation` é opcional e representa o estado do agendamento, podendo ser marcado como `scheduled` (agendado), `concluded` (concluído), `cancelled` (cancelado), `awaiting` (aguardando). Cada estado será explicado melhor mais tarde. Por padrão, se nenhum parâmetro `situation` for passado, ele será automaticamente entendido como `scheduled`.

Após esse processo, o dado do banco de dados será persistido no banco de dados com os parâmetros `applicant`, que representa quem fez o agendamento, `created_at` e `updated_at`, além dos já citados `scheduled_date` e `situation`.
