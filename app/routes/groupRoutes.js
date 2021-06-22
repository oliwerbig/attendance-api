module.exports = app => {
    const groups = require("../controllers/group");

    var router = require("express").Router();

    router.post("/", groups.createGroup);
    router.get("/", groups.findAllGroup);
    router.get("/:groupId", groups.findGroupByPk);
    router.put("/:groupId", groups.updateGroup);
    router.delete("/:groupId", groups.destroyGroup);

    router.post("/:groupId/sessions", groups.createSession);
    router.get("/:groupId/sessions", groups.findAllSession);

    router.post("/:groupId/students", groups.createStudent);
    router.get("/:groupId/students", groups.findAllStudent);

    app.use('/api/groups', router);
};