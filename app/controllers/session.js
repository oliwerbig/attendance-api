const db = require("../db");
const Session = db.Session;
const Attendance = db.Attendance;
const Student = db.Student;

exports.findAllSession = ({ query: { sessionName } }, res) => {
    var condition = sessionName ? { name: { [Op.like]: `%${sessionName}%` } } : null;

    Session.findAll({ where: condition, include: [Attendance] })
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

exports.findSessionByPk = ({ params: { sessionId } }, res) => {
    Session.findByPk(sessionId, { include: [Attendance] })
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
                    message: "Entry updated successfully."
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

exports.destroySession = ({ params: { sessionId } }, res) => {
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

exports.destroyAllSession = (req, res) => {
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

exports.createAttendance = ({ params: { studentId, sessionId }, body: attendance }, res) => {
    Attendance.create({ ...attendance, studentId, sessionId })
        .then(() => {
            res.send({
                message: "Entry created successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message
            });
        });
};

exports.findAllAttendance = ({ params: { sessionId } }, res) => {
    Attendance.findAll({ where: { sessionId: sessionId } })
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

exports.destroyAllAttendance = ({ params: { sessionId } }, res) => {
    Attendance.destroy({
        where: { sessionId: sessionId },
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