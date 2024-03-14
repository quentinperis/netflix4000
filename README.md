# Netflix - Natalia

## Creation de base de donnée MongoDB 

- Dans le terminal `mongosh` on tape la commande use `movies_db`
- Ensuite `db.createCollection(movies)`. 
- On ouvre cette collection et on clique sur le bouton `+ ADD DATA`. On choisi `Import JSON or CVS file` et on importe ce fichier: ..\Server\data\images


## Configuration Express et Mongoose

- `npm i express`
- `npm i mongoose`
- Installation des middlewares : `npm i cors`, `npm body-parser`

## Lancement deux servers

- back: dans un terminal -  ..\Server `nodemon app.js`
- front: dans un autre terminal - ..\Netlix `npm run dev`
