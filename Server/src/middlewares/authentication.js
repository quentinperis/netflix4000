const jwt = require("jsonwebtoken");

// Définir votre clé secrète commune pour front et back 
const secretKey = "vivment_ca_marche";

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
    res.status(401).json({ message: error.toString() });
  }
};

module.exports = isAuthenticated;
