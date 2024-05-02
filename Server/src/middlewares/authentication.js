const jwt = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
        };
        return next();
    } catch (error) {
        res.status(401).json({ message: "Merci de vous connecter !" });
    }
};

module.exports = isAuthenticated;


