"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import http, { IncomingMessage, ServerResponse, Server } from "http";
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./myRoutes/users"));
//Initializing the express app
const app = (0, express_1.default)();
app.use(body_parser_1.default.json()); //Means that we are going to use json data in our whole app
app.use(express_1.default.urlencoded({ extended: true }));
//Adding static files
app.use(express_1.default.static('public'));
app.use('/css', express_1.default.static(__dirname + '/public/css'));
app.use('/img', express_1.default.static(__dirname + '/public/img'));
// console.log('dir is: ',__dirname)
//Setting views
app.set('views', (__dirname + '/views'));
app.set('view engine', 'ejs');
app.use('/', users_1.default);
//app.use('/about', userRouters)
// app.use('/users', userRouters)
//Sending request to the homepage
//app.use('/register', userRouters)   //Register router
// app.use('/login', userRouters)  //Login router
//app.use('/', userRouters)   //Post router for form data
app.listen(3232, () => {
    console.log('Server has started listening on port 3232');
});
//# sourceMappingURL=myapp.js.map