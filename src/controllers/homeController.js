import db from "../models/index.js";

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

export default {
    getHomePage
};