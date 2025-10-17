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
let displayGETCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUsers();
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
};
let getEditCRUD = async (req, res) => {
    try {
        let userId = req.query.id;
        if (!userId) {
            return res.send("Missing user ID!");
        }

        let userData = await CRUDservice.getUserInfoById(userId);

        if (!userData || Object.keys(userData).length === 0) {
            return res.send("User not found!");
        }

        return res.render("editCRUD.ejs", { user: userData });
    } catch (e) {
        console.error(e);
        return res.status(500).send("Server error!");
    }
};
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render(
        "displayCRUD.ejs", {
        dataTable: allUsers
    })
};
let deleteCRUD = async (req, res) => {
let id = req.query.id;
if(id){
    await CRUDservice.deleteUserById(id);
    return res.send("Delete succeed!")
}else{
    return res.send("User not found!")
}
};

export default {
    getHomePage,
    getCRUD,
    postCRUD,
    putCRUD,
    deleteCRUD,
    displayGETCRUD,
    getEditCRUD,
    CRUDservice
};