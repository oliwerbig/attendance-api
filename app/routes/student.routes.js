module.exports = app => {
    const students = require("../controllers/student.controller.js");

    var router = require("express").Router();

    router.post("/", students.createStudent);
    router.get("/", students.findAllStudents);
    router.get("/:studentId", students.findStudent);
    router.put("/:studentId", students.updateStudent);
    router.delete("/:studentId", students.deleteStudent);
    router.delete("/", students.deleteAllStudents);

    app.use('/api/students', router);
};