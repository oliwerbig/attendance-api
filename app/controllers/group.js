const db = require("../db");
const Group = db.Group;
const Session = db.Session;
const Student = db.Student;

exports.createGroup = ({ body: group }, res) => {
    if (!group) {
        res.status(400).send({
            message: "Content cannot be empty!"
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

exports.findAllGroup = ({ query: { groupName } }, res) => {
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
                    message: "Entry updated successfully!"
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

exports.createSession = ({ params: { groupId }, body: session }, res) => {
    if (!session) {
        res.status(400).send({
            message: "Content cannot be empty!"
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

exports.findAllSession = ({ params: { groupId }, query: { sessionName } }, res) => {
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

exports.createStudent = ({ params: { groupId }, body: student }, res) => {
    if (!student) {
        res.status(400).send({
            message: "Content cannot be empty!"
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

exports.findAllStudent = ({ params: { groupId }, query: { studentName } }, res) => {
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