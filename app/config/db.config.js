const { Sequelize } = require("sequelize");
require("dotenv").config();

const isRender = process.env.RENDER === "true" || process.env.DATABASE_URL?.includes("render.com");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: isRender
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
  logging: false,
});

module.exports = { sequelize };
