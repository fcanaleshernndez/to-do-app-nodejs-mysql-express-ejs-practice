const { restart } = require("nodemon");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM list l INNER JOIN status st on st.id = l.fk_status ORDER BY l.id ASC ", (err, users) => {
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

controller.save = (req, res) => {
    req.getConnection((err, conn) => {
        const dataBody = req.body;

        if (dataBody.addName == "" || dataBody.addDescription == "") {
            res.send("ERROR");
        } else {
            conn.query("INSERT INTO list (name, description, fk_status) VALUES (?, ?, ?)", [dataBody.addName, dataBody.addDescription, 1], (err, list) => {
                if (err) {
                    res.json(err);
                } else {
                    res.redirect('/');
                }
            });
        }

    });
};

module.exports = controller;