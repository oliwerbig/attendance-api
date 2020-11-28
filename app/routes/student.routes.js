module.exports = app => {
    const students = require("../controllers/student");

    var router = require("express").Router();

    router.get("/", students.findAllStudents);
    router.get("/:studentId", students.findStudentByPk);
    router.put("/:studentId", students.updateStudent);
    router.delete("/:studentId", students.destroyStudent);
    router.delete("/", students.destroyAllStudents);

    router.post("/:studentId/sessions/:sessionId/attendances", students.createAttendance);
    router.get("/:studentId/attendances", students.findAllAttendances);
    router.delete("/:studentId/attendances", students.destroyAllAttendances);

    app.use('/api/students', router);
};