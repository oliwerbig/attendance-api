module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("group", {
        groupName: {
            type: Sequelize.STRING
        },
    });

    return Group;
};