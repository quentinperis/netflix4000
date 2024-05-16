const jwt = require("jsonwebtoken");
require('dotenv').config(); // Charger les variables d'environnement

const secretKey = process.env.ACCESS_TOKEN_SECRET;

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Vérifier un jeton JWT
    const decodedToken = jwt.verify(token, secretKey);

    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    return next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Session expired' });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
};

module.exports = { secretKey, isAuthenticated }; 
