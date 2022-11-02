"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });
const registrationSchema = joi_1.default.object({
    first_name: joi_1.default.string().min(3).max(25).trim(true).required(),
    last_name: joi_1.default.string().min(3).max(25).trim(true).required(),
    email_address: joi_1.default.string().email().trim(true).required(),
    phone: joi_1.default.string().length(11).pattern(/[6-9]{1}[0-9]{9}/).required(),
    address: joi_1.default.string().min(3).max(25).trim(true).required(),
    password: joi_1.default.string().min(8).trim(true).required(),
    confirm_password: joi_1.default.ref("password")
});
//to bcrypt password
//To authenticate at login
// const comparePassword = async(plainText: string, hash: string) =>{
//     try {
//         const result = await bcrypt.compare(plainText, hash)
//         return result
//     } catch (error) {
//         if(error)console.error('An error occured')
//     }
//     }
//     comparePassword('e','e')
exports.validateUser = validator(registrationSchema);
//# sourceMappingURL=validator.js.map