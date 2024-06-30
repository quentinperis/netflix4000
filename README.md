# netflix4000

1. **Créer une BDD NoSQL sur MongoDB**

- name : movies_db
- collection : movies
- ADD DATA + : aller chercher le dossier json des movies dans server/data/movies.json

2. **Ouvrir le terminal depuis netflix4000**

- cd server
- `npm i express`
- `npm i mongoose`
- `npm i cors`
- `npm i body-parser`
- `npm install -g nodemon`
- `nodemon app.js`

3. **Ouvrir le terminal depuis netflix4000**

- cd netflix8000
- `npm i`
- `npm i axios`
- `npm run dev`

4. **Authentication**

- `npm i jsonwebtoken`
- `npm i bcrypt`

5. **Configuration .env**

- `npm i dotenv`
- Créer ficher .env et placer la dans .gitignore

5. **Générer une clé secrète en NodeJS**

- exécuter en bash : `node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"`
- `ACCESS_TOKEN_SECRET = PLACER SECRET_KEY_ICI`

5. **Front recuperer les info de user**

- `npm install jwt-decode`
- Vite utilise Rollup sous-jacentement, et nous pouvons utiliser le plugin @rollup/plugin-replace pour remplacer les valeurs des variables d'environnement lors de la construction de l'application.
- `npm install --save-dev @rollup/plugin-replace` 


