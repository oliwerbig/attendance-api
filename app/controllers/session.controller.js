const db = require("../models");
const Group = db.groups;
const Session = db.sessions;
const Student = db.students;

exports.createSession = ({ body: session }, res) => {
    if (!session.sessionName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Session.create(session)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message
            });
        });
};

exports.findAllSessions = (req, res) => {
    Session.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message
            });
        });
};

exports.findSession = ({ params: { sessionId } }, res) => {
    Session.findByPk(sessionId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving entry with id=" + sessionId
            });
        });
};

exports.updateSession = ({ body: session, params: { sessionId } }, res) => {
    Session.update(session, { where: { id: sessionId } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update entry with id=${sessionId}. Maybe it was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating entry with id=" + sessionId
            });
        });
};

exports.deleteSession = ({ params: { sessionId } }, res) => {
    Session.destroy({
        where: { id: sessionId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Entry deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete entry with id=${sessionId}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete entry with id=" + sessionId
            });
        });
};

exports.deleteAllSessions = (req, res) => {
    Session.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} entries were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message
            });
        });
};
