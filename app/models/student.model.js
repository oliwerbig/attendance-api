module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        studentName: {
            type: Sequelize.STRING
        },
    });

    return Student;
};