import { db } from "../models";

console.log(`Connecting to DB: ${db.sequelize.config.host}:${db.sequelize.config.port}/${db.sequelize.config.database}`);

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("All models were synchronized successfully.");
  });
