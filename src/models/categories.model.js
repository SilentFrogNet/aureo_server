import { Model } from "sequelize";

class Category extends Model {}

const CategoryObj = (sequelize, Sequelize) => Category.init(
  {
    // Model attributes are defined here
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      // allowNull defaults to true
    },
    parent_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
  }
);

export default CategoryObj;
