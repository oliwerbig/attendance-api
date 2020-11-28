const db = require("../db");
const Group = db.Group;
const Session = db.Session;
const Student = db.Student;

exports.createGroup = ({ body: group }, res) => {
    if (!group.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Group.create(group)
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

exports.findAllGroups = ({ query: { groupName } }, res) => {
    var condition = groupName ? { name: { [Op.like]: `%${groupName}%` } } : null;

    Group.findAll({ where: condition, include: [Session, Student] })
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

exports.findGroupByPk = ({ params: { groupId } }, res) => {
    Group.findByPk(groupId, { include: [Session, Student] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving entry with id=" + groupId
            });
        });
};

exports.updateGroup = ({ body: group, params: { groupId } }, res) => {
    Group.update(group, { where: { id: groupId } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update entry with id=${groupId}. Maybe it was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating entry with id=" + groupId
            });
        });
};

exports.destroyGroup = ({ params: { groupId } }, res) => {
    Group.destroy({
        where: { id: groupId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Entry deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete entry with id=${groupId}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete entry with id=" + groupId
            });
        });
};

exports.destroyAllGroups = (req, res) => {
    Group.destroy({
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

exports.createSession = ({ params: { groupId }, body: session }, res) => {
    if (!session.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Session.create({ ...session, groupId })
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

exports.findAllSessions = ({ params: { groupId }, query: { sessionName } }, res) => {
    var condition = sessionName ? { name: { [Op.like]: `%${sessionName}%` } } : null;

    Session.findAll({ where: condition && { groupId: groupId } })
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

exports.destroyAllSessions = ({ params: { groupId } }, res) => {
    Session.destroy({
        where: { groupId: groupId },
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

exports.createStudent = ({ params: { groupId }, body: student }, res) => {
    if (!student.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Student.create({ ...student, groupId })
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

exports.findAllStudents = ({ params: { groupId }, query: { studentName } }, res) => {
    var condition = studentName ? { name: { [Op.like]: `%${studentName}%` } } : null;

    Student.findAll({ where: condition && { groupId: groupId } })
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

exports.destroyAllStudents = ({ params: { groupId } }, res) => {
    Student.destroy({
        where: { groupId: groupId },
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