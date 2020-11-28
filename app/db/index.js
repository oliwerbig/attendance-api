const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const GroupModel = require('./models/group');
const StudentModel = require('./models/student');
const SessionModel = require('./models/session');
const AttendanceModel = require('./models/attendance');

const Group = GroupModel(sequelize, Sequelize);
const Student = StudentModel(sequelize, Sequelize);
const Session = SessionModel(sequelize, Sequelize);
const Attendance = AttendanceModel(sequelize, Sequelize);

Group.hasMany(Student);

Group.hasMany(Session);

Student.belongsTo(Group);

Student.hasMany(Attendance);

Session.belongsTo(Group);

Session.hasMany(Attendance);

Attendance.belongsTo(Student);

Attendance.belongsTo(Session);

module.exports = {
  sequelize,
  Sequelize,
  Group,
  Student,
  Session,
  Attendance
}