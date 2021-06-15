module.exports = app => {
    const students = require("../controllers/student");

    var router = require("express").Router();

    router.get("/", students.findAllStudent);
    router.get("/:studentId", students.findStudentByPk);
    router.put("/:studentId", students.updateStudent);
    router.delete("/:studentId", students.destroyStudent);
    router.delete("/", students.destroyAllStudent);

    router.post("/:studentId/sessions/:sessionId/attendances", students.createAttendance);
    router.get("/:studentId/attendances", students.findAllAttendance);
    router.delete("/:studentId/attendances", students.destroyAllAttendance);

    app.use('/api/students', router);
};