const db = require("../db");
const Attendance = db.Attendance;
const Session = db.Session;
const Student = db.Student;

exports.findAllAttendance = (req, res) => {
    Attendance.findAll({ include: [Session, Student] })
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

exports.findAttendanceByPk = ({ params: { attendanceId } }, res) => {
    Attendance.findByPk(attendanceId, { include: [Session, Student] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving entry with id=" + attendanceId
            });
        });
};

exports.updateAttendance = ({ body: attendance, params: { attendanceId } }, res) => {
    Attendance.update(attendance, { where: { id: attendanceId } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update entry with id=${attendanceId}. Maybe it was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating entry with id=" + attendanceId
            });
        });
};

exports.destroyAttendance = ({ params: { attendanceId } }, res) => {
    Attendance.destroy({
        where: { id: attendanceId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Entry deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete entry with id=${attendanceId}. Maybe it was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete entry with id=" + attendanceId
            });
        });
};

exports.destroyAllAttendance = (req, res) => {
    Attendance.destroy({
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
