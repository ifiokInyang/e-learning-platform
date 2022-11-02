import Joi from 'joi'
const validator = (schema: any) => (payload: any) => 
schema.validate(payload, {abortEarly: false})

const registrationSchema = Joi.object({
    first_name: Joi.string().min(3).max(25).trim(true).required(),
    last_name: Joi.string().min(3).max(25).trim(true).required(),
    email_address: Joi.string().email().trim(true).required(),
    phone: Joi.string().length(11).pattern(/[6-9]{1}[0-9]{9}/).required(),
    address: Joi.string().min(3).max(25).trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
    confirm_password: Joi.ref("password")
})





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

exports.validateUser = validator(registrationSchema)