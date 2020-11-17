module.exports = app => {
    const groups = require("../controllers/group.controller.js");

    var router = require("express").Router();

    router.post("/", groups.createGroup);
    router.get("/", groups.findAllGroups);
    router.get("/:groupId", groups.findGroup);
    router.put("/:groupId", groups.updateGroup);
    router.delete("/:groupId", groups.deleteGroup);
    router.delete("/", groups.deleteAllGroups);

    app.use('/api/groups', router);
};