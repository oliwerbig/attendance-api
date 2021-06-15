module.exports = app => {
    const groups = require("../controllers/group");

    var router = require("express").Router();

    router.post("/", groups.createGroup);
    router.get("/", groups.findAllGroups);
    router.get("/:groupId", groups.findGroupByPk);
    router.put("/:groupId", groups.updateGroup);
    router.delete("/:groupId", groups.destroyGroup);
    router.delete("/", groups.destroyAllGroups);

    router.post("/:groupId/sessions", groups.createSession);
    router.get("/:groupId/sessions", groups.findAllSessions);
    router.delete("/:groupId/sessions", groups.destroyAllSessions);

    router.post("/:groupId/students", groups.createStudent);
    router.get("/:groupId/students", groups.findAllStudents);
    router.delete("/:groupId/students", groups.destroyAllStudents);

    app.use('/api/groups', router);
};