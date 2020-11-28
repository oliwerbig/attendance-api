module.exports = app => {
    const sessions = require("../controllers/session");

    var router = require("express").Router();

    router.get("/", sessions.findAllSessions);
    router.get("/:sessionId", sessions.findSessionByPk);
    router.put("/:sessionId", sessions.updateSession);
    router.delete("/:sessionId", sessions.destroySession);
    router.delete("/", sessions.destroyAllSessions);

    router.post("/:sessionId/students/:studentId/attendances", sessions.createAttendance);
    router.get("/:sessionId/attendances", sessions.findAllAttendances);
    router.delete("/:sessionId/attendances", sessions.destroyAllAttendances);

    app.use('/api/sessions', router);
};