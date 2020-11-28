module.exports = app => {
    const attendances = require("../controllers/attendance");

    var router = require("express").Router();

    router.get("/", attendances.findAllAttendances);
    router.get("/:attendanceId", attendances.findAttendanceByPk);
    router.put("/:attendanceId", attendances.updateAttendance);
    router.delete("/:attendanceId", attendances.destroyAttendance);
    router.delete("/", attendances.destroyAllAttendances);

    app.use('/api/attendances', router);
};