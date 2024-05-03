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
- `nodemon app.js`

3. **Ouvrir le terminal depuis netflix4000**

- cd netflix8000
- `npm i`
- `npm i axios`
- `npm run dev`

4. **Authentication**

- `npm i jsonwebtoken`
- `npm i bcrypt`

5. **Création de la collection users via mongosh**

- `use movies_db`
- ```php
        db.createCollection("users", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["email"],
                    properties: {
                        email: {npm 
                            bsonType: "string",
                            description: "must be a string and is required"
                        }
                    }
                }
            },
            validationLevel: "strict",
            validationAction: "error"
        })
```



