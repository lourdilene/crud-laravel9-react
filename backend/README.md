# Laravel 9

Está aplicação utiliza o Docker containers, eis a lista:

* pgsql - Database server
* laravel - API

## Como utilizar

### 1. Preparação

Clone o repositório do github e mude de diretório de trabalho

    git clone git@github.com:lourdilene/crud-laravel9-react.git
    cd crud-laravel9-react
    cp docker-compose.dist.yml docker-compose.yml

Dentro de `docker-compose.yml` você precisa alterar os valores para o que você precisa. 

### 2. Instale todas as dependências necessárias

Execute o seguinte comandando para instalar as dependências do laravel. 

    composer install
    composer require laravel/sail --dev

Execute o seguinte comando para criar os containers

    ./vendor/bin/sail up

### 3. Configuração da aplicação

Entre no container criado.

    docker exec -it backend-laravel-1 bash

Dentro do container execute.

    php artisan migrate:fresh --seed


Após isso o laravel estará disponivel para uso em localhost. 


# React
Execute os seguintes comandos:

cd frontend
npm install
npm start
