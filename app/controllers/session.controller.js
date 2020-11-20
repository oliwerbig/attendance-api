const db = require("../models");
const Session = db.sessions;

exports.findAllSessions = ({ query: { sessionName }, params: { groupId } }, res) => {
    var condition = sessionName ? { sessionName: { [Op.like]: `%${sessionName}%` } } : null;

    Session.findAll({ where: condition })
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
