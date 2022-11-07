"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/protected', (req, res) => {
    res.json({
        posts: { title: 'My protected route',
            description: 'This is a protected route'
        }
    });
});
// export default router;
//# sourceMappingURL=posts.js.map