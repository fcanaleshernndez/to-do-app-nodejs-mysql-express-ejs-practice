const { restart } = require("nodemon");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT *,l.id as idList FROM list l INNER JOIN status st on st.id = l.fk_status ORDER BY l.id ASC ", (err, users) => {
            if (err) {
                res.json(err);
            }
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

controller.delete = (req, res) => {

    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query("DELETE FROM list WHERE id = ?", [id], (err, rows) => {
            if (rows) {
                res.json('eliminado');
            } else {
                res.json(err);
            }
        });
    })
}

controller.update = (req, res) => {

    const { id } = req.params;
    const dataBody = req.body;

    req.getConnection((err, conn) => {

        conn.query("UPDATE list SET name = ?, description = ?, fk_status= ? WHERE id = ?", [dataBody.uptName, dataBody.uptDescription, dataBody.fk_status, id], (err, rows) => {
            res.json("actualizado");
        });

    })
}

controller.getStatus = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM status", (err, status) => {
            res.json(status)
        });
    })
}

module.exports = controller;