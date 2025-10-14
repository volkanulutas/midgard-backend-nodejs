const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config.js");

// dbConfig içindeki sequelize nesnesini al
const sequelize = dbConfig.sequelize;

// Sequelize model tanımları için db nesnesi oluştur
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelleri yükle
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.messages = require("./message.model.js")(sequelize, Sequelize);

module.exports = db;
