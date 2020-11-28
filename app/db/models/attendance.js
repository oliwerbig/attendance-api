
module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define('attendance', {
        status: {
            type: DataTypes.STRING
        },
        lateness: {
            type: DataTypes.INTEGER
        }
    });

    return Attendance;
};