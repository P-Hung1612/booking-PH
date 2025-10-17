import bcrypt from 'bcryptjs';
import db from '../models/index.js';
import { where } from 'sequelize';

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
let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            reject(error);
        }
    });
}
let getUserInfoById = async (userId) => {
    try {
        if (!userId) return {};
        const user = await db.User.findOne({
            where: { id: userId },
            raw: true,
        });
        return user || {};
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                console.log("⚠️ Missing ID in updateUserData:", data);
                return resolve(); // hoặc reject("Missing ID");
            }

            let user = await db.User.findOne({
                where: { id: data.id }
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phonenumber = data.phonenumber;
                user.gender = data.gender;

                await user.save();

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve("User not found");
            }
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
let deleteUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id }
            })
            if (user) {
                user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
};

export default {
    createNewUser,
    getAllUsers,
    deleteUserById,
    getUserInfoById,
    updateUserData
};