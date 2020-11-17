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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.groups = require("./group.model.js")(sequelize, Sequelize);
db.sessions = require("./session.model.js")(sequelize, Sequelize);
db.students = require("./student.model.js")(sequelize, Sequelize);

db.groups.hasMany(db.sessions, { as: "sessions" });
db.groups.hasMany(db.students, { as: "students" });

db.sessions.belongsTo(db.groups, {
  foreignKey: "groupId",
  as: "group",
});
db.students.belongsTo(db.groups, {
  foreignKey: "groupId",
  as: "group",
});

module.exports = db;
