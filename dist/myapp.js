"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./myRoutes/users"));
// import postRoutes from './myRoutes/posts'
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
//Initializing the express app
const app = (0, express_1.default)();
dotenv_1.default.config();
//Middlewwares
app.use(body_parser_1.default.json()); //Means that we are going to use json data in our whole app
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
//Adding static files
app.use(express_1.default.static('public'));
app.use('/css', express_1.default.static(__dirname + '/public/css'));
app.use('/img', express_1.default.static(__dirname + '/public/img'));
console.log('dir is: ', __dirname);
//Setting views
app.set('views', (__dirname + '/views'));
app.set('view engine', 'ejs');
app.use('/', users_1.default);
// app.use('/protected', postRoutes)
app.listen(3232, () => {
    console.log('Server has started listening on port 3232');
});
//# sourceMappingURL=myapp.js.map