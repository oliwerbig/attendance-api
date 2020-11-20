module.exports = app => {
    const sessions = require("../controllers/session.controller.js");

    var router = require("express").Router();
    
    router.get("/", sessions.findAllSessions);
    router.get("/:sessionId", sessions.findSession);
    router.put("/:sessionId", sessions.updateSession);
    router.delete("/:sessionId", sessions.deleteSession);
    router.delete("/", sessions.deleteAllSessions);

    app.use('/api/sessions', router);
};