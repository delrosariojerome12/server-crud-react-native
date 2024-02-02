const dbConfig = require("../config/db.config");

const {Sequelize, DataTypes} = require("sequelize");

const HOST = process.env.HOST;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;
const USER = process.env.USER;

const sequelize = new Sequelize(
  DB || dbConfig.DB,
  USER || dbConfig.USER,
  PASSWORD || dbConfig.PASSWORD,
  {
    host: HOST || dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("ERROR" + error);
  });

const db = {};

db.Sequelize = sequelize;
db.sequelize = sequelize;

db.products = require("./productModel.js")(sequelize, DataTypes);
db.review = require("./reviewModel.js")(sequelize, DataTypes);
db.user = require("./userModel.js")(sequelize, DataTypes);

db.sequelize.sync({force: false}).then(() => {
  console.log("yes re-sync");
});

module.exports = db;
