module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        sessionName: {
            type: Sequelize.STRING
        },
        sessionDate: {
            type: Sequelize.DATE
        },
    });

    return Session;
};