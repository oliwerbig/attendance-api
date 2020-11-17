const db = require("../models");
const Group = db.groups;
const Session = db.sessions;
const Student = db.students;

exports.createStudent = ({ body: student }, res) => {
    if (!student.studentName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    Student.create(student)
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

exports.findAllStudents = (req, res) => {
    Student.findAll()
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

exports.findStudent = ({ params: { studentId } }, res) => {
    Student.findByPk(studentId)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving entry with id=" + studentId
            });
        });
};

exports.updateStudent = ({ body: student, params: { studentId } }, res) => {
    Student.update(student, { where: { id: studentId } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update entry with id=${studentId}. Maybe it was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating entry with id=" + studentId
            });
        });
};

exports.deleteStudent = ({ params: { studentId } }, res) => {
    Student.destroy({
        where: { id: studentId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Entry deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete entry with id=${studentId}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete entry with id=" + studentId
            });
        });
};

exports.deleteAllStudents = (req, res) => {
    Student.destroy({
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
