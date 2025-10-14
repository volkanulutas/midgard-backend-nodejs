const db = {};
db.Sequelize = Sequelize;
db.sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  }
});

module.exports = db;
