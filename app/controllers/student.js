const db = require("../db");
const Student = db.Student;
const Attendance = db.Attendance;
const Session = db.Session;

exports.findAllStudents = ({ query: { studentName } }, res) => {
    var condition = studentName ? { name: { [Op.like]: `%${studentName}%` } } : null;

    Student.findAll({ where: condition, include: [Attendance] })
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

exports.findStudentByPk = ({ params: { studentId } }, res) => {
    Student.findByPk(studentId, { include: [Attendance] })
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

exports.destroyStudent = ({ params: { studentId } }, res) => {
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

exports.destroyAllStudents = (req, res) => {
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

exports.createAttendance = ({ params: { sessionId, studentId }, body: attendance }, res) => {
    Attendance.create({ ...attendance, studentId, sessionId })
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

exports.findAllAttendances = ({ params: { studentId } }, res) => {
    Attendance.findAll({ where: { studentId: studentId } })
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

exports.destroyAllAttendances = ({ params: { studentId } }, res) => {
    Attendance.destroy({
        where: { studentId: studentId },
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