module.exports = app => {
    const groups = require("../controllers/group.controller.js");

    var router = require("express").Router();

    router.post("/", groups.createGroup);
    router.get("/", groups.findAllGroups);
    router.get("/:groupId", groups.findGroup);
    router.put("/:groupId", groups.updateGroup);
    router.delete("/:groupId", groups.deleteGroup);
    router.delete("/", groups.deleteAllGroups);

    router.post("/:groupId/sessions", groups.createSession);
    router.get("/:groupId/sessions", groups.findAllSessions);
    router.delete("/:groupId/sessions", groups.deleteAllSessions);

    router.post("/:groupId/students", groups.createStudent);
    router.get("/:groupId/students", groups.findAllStudents);
    router.delete("/:groupId/students", groups.deleteAllStudents);

    app.use('/api/groups', router);
};