module.exports = app => {
    const attendances = require("../controllers/attendance");

    var router = require("express").Router();

    router.get("/", attendances.findAllAttendance);
    router.get("/:attendanceId", attendances.findAttendanceByPk);
    router.put("/:attendanceId", attendances.updateAttendance);
    router.delete("/:attendanceId", attendances.destroyAttendance);
    router.delete("/", attendances.destroyAllAttendance);

    app.use('/api/attendances', router);
};