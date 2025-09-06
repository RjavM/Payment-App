const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = async (req, res, next) => {
    const header = req.headers['authorization'];
    

    if (!header || !header.startsWith("Bearer")) {
        return res.status(403).json({
            msg: "Error"
        });
    }

    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({
                msg: "Invalid token"
            });
        }
    }
    catch(e) {
        return res.status(403).json({
            msg: e
        });
    }
}

module.exports = { authMiddleware }