const db = require("../models");
const Group = db.groups;
const Session = db.sessions;
const Student = db.students;

exports.createGroup = ({ body: group }, res) => {
    if (!group.groupName) {
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

exports.findAllGroups = (req, res) => {
    Group.findAll({ include: ["sessions", "students"] })
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

exports.findGroup = ({ params: { groupId } }, res) => {
    Group.findByPk(groupId, { include: ["sessions", "students"] })
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

exports.deleteGroup = ({ params: { groupId } }, res) => {
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

exports.deleteAllGroups = (req, res) => {
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