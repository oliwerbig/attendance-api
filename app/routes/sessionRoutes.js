module.exports = app => {
    const sessions = require("../controllers/session");

    var router = require("express").Router();

    router.get("/", sessions.findAllSession);
    router.get("/:sessionId", sessions.findSessionByPk);
    router.put("/:sessionId", sessions.updateSession);
    router.delete("/:sessionId", sessions.destroySession);

    router.post("/:sessionId/students/:studentId/attendances", sessions.createAttendance);
    router.get("/:sessionId/attendances", sessions.findAllAttendance);

    app.use('/api/sessions', router);
};