# Flashcards

This is a small application to create, edit and use flashcards for learning.

## Features

It is able to

* :pencil: Create and Edit Flashcards with Markdown
* :pencil: Tag cards with a keyword
* :card_index: Group them as a collection via their tags
* :twisted_rightwards_arrows: Shuffle cards to start learning them randomly

## Getting Started

There are two common ways to boot up an dev environment.

1. Setting up the base
   1. Use the devcontainer which is part of this repository, boot up the docker-compose and have everything installed as you need.
   2. Use your local node, npm and postgres installation
2. Run `npm install`
3. Copy `.env.dist` as `.env.local` and set your database settings
4. Run `npm run db:migrate:dev`
5. Run `npm run dev`

## Deployment

This repository holds an docker image of the application and a `docker-compose.yml`. This `docker-compose.yml` expects a `.env` file in their directory with the database configuration. Besides that it will use the latest version and start the application. 
