import { db } from "../src/models";

before(async () => {
  await db.sequelize.sync({ force: true });
  console.log("TEST: All models were synchronized successfully.\n");
});

after(async () => {
  await db.sequelize.drop();
  console.log("TEST: All tables dropped!");
});
