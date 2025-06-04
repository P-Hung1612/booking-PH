import db from "../models/index.js";
import CRUDservice from "../services/CRUDservice.js";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};

let getCRUD = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("crud", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
};
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.send("Post CRUD from server");
};
export default {
    getHomePage,
    getCRUD,
    postCRUD,
    CRUDservice
};