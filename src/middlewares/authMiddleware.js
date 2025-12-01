const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Auth Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const parts = authHeader.split(" ");

    console.log("Parts:", parts);

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token error" });
    }

    const [scheme, token] = parts;

    console.log("Scheme:", scheme);
    console.log("Token:", token);

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, decoded) => {
        if (err) {
            console.log("JWT Error:", err.message);
            return res.status(401).json({ error: "Token inválido" });
        }

        console.log("Decodificado:", decoded);
        req.userId = decoded.id;
        return next();
    });
};
