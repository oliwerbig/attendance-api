
module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('session', {
        name: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return Session;
};