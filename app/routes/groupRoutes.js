module.exports = app => {
    const groups = require("../controllers/group");

    var router = require("express").Router();

    router.post("/", groups.createGroup);
    router.get("/", groups.findAllGroup);
    router.get("/:groupId", groups.findGroupByPk);
    router.put("/:groupId", groups.updateGroup);
    router.delete("/:groupId", groups.destroyGroup);
    router.delete("/", groups.destroyAllGroup);

    router.post("/:groupId/sessions", groups.createSession);
    router.get("/:groupId/sessions", groups.findAllSession);
    router.delete("/:groupId/sessions", groups.destroyAllSession);

    router.post("/:groupId/students", groups.createStudent);
    router.get("/:groupId/students", groups.findAllStudent);
    router.delete("/:groupId/students", groups.destroyAllStudent);

    app.use('/api/groups', router);
};