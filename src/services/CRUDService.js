import bcrypt from 'bcryptjs';
import db from '../models/index.js';

const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false, // Convert
                phonenumber: data.phonenumber,
                roleID: data.roleID,
            })
            resolve("Create user successfully!");

        } catch (error) {
            console.error("Error creating user:", error);
            reject(error);
        }
    });
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (error) {
            console.error("Error hashing password:", error);
            reject(error);
        }
    });
}
export default {
    createNewUser
};