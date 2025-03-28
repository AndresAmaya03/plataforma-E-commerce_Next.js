# E-commerce platform

## How to run this project on dev

* 1.- Clone the repository
* 2.- Create a copy of ```.env.template```, rename it to ```.env``` and change the enviroment variables.
* 3.- Install dependencies with ```npm install```
* 4.- Get the database up with ```docker-compose up -d```
* 5.- Run Prisma migrations with ```npx prisma migrate dev```
* 6.- Excecute seed with ```npm run seed```
* 7.- Run the project with ```npm run dev```
* 8.- Clean the browser's Local Storage

## How to make a production version
