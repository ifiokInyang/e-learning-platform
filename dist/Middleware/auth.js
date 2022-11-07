"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Middleware function that we can add to routes that we want to be protected
const auth = (req, res, next) => {
    const token = req.header('auth-token'); //When we send a request, this checks if the token is in the header
    if (!token)
        return res.status(401).send('Access Denied');
    try {
        const verified = jsonwebtoken_1.default.verify(token, `${process.env.TOKEN_SECRET}`); //If the token is in the header, it will verify it
        req.user = verified;
        next(); //To pass the handler to the next middleware function
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
};
exports.default = auth;
//# sourceMappingURL=auth.js.map