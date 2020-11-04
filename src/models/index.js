import { Sequelize } from "sequelize";
import { nodeEnv, dbConfig } from "../settings";
import Category from "./categories.model";

console.log(`Running in ${nodeEnv} mode`);

const databaseConfigs = dbConfig[nodeEnv];

export const sequelize = new Sequelize(
  databaseConfigs.database,
  databaseConfigs.username,
  databaseConfigs.password,
  {
    host: databaseConfigs.host,
    port: databaseConfigs.port,
    dialect: databaseConfigs.dialect,
    logging: databaseConfigs.logging,
    pool: databaseConfigs.pool
  }
);

const dbInstance = {};

// Init Sequelize references
dbInstance.Sequelize = Sequelize;
dbInstance.sequelize = sequelize;

// Add all models to dbInstance object
dbInstance.categories = Category(sequelize, Sequelize);

export const db = dbInstance;
