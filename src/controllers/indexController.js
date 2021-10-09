const { restart } = require("nodemon");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM list", (err, users) => {
            if (err) {
                res.json(err);
            }
            console.log(users);
            res.render('index-view', {
                data: users
            });

        });
    });
};

module.exports = controller;