# API feita para ser usada no site da clínica corpo e mente

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
</ul>

## Requisitos para utilizar a API
Tenha instalado na sua máquina o NodeJS versão 12 ou mais atual.
Tenha também instalado um software como Postman ou Insomnia (ou a extensão Thunder Client, do Visual Studio Code) para vizualizar as respostas de cada rota da api. Todos os comando apresentados abaixo podem ser feitos pelo terminal integrando do VS Code.

## Passo a passo de como utilizar
1. O primeiro passo é instalar todos módulos utilizados no projeto. Para isso, utilize o comando `node install` ou `yarn add` para as baixar e instalar.

2. Rode o comando `npm run migration:run` ou `yarn migration:run` para rodar todas as migrations e criar o banco de dados do projeto.

3. Rode o comando `npm run dev` ou `yarn dev` para iniciar o servidor da api e agora ela está pronta para ser utilizada :)

O servidor é aberto em `localhost:3000/`. 
> Dica: Comece criando um novo usuário pela rota `localhost:3000/user/new`