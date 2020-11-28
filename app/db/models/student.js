module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('student', {
        name: {
            type: DataTypes.STRING
        }
    });

    return Student;
};