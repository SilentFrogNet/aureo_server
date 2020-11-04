import { db } from "../models";

const { Op } = db.Sequelize;
const Category = db.categories;

// Create and Save a new Category
export const create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot be empty",
    });
    return;
  }

  // Create a Category
  const category = {
    name: req.body.name,
    description: req.body.description || null,
    parent_id: req.body.parent_id || null,
  };

  // Save Category in the database
  Category.create(category)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category.",
      });
    });
};

// Retrieve all Category from the database.
export const findAll = (req, res) => {
  const { name } = req.query;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Category.findAll({ where: condition })
    .then((data) => {
      res.send({ categories: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};

// Find a single Category with an id
export const findOne = (req, res) => {
  const { id } = req.params;

  Category.findByPk(id)
    .then((data) => {
      if (data === null) {
        res.status(404).send({
          message: `Cannot find Category with id=${id}.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error retrieving Category with id=${id}`,
      });
    });
};

// Update a Category by the id in the request
export const update = (req, res) => {
  const { id } = req.params;

  Category.update(req.body, {
    where: { id },
  })
    .then((data) => {
      const num = data[0];
      if (num === 1) {
        res.send({
          message: "Category was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Error updating Category with id=${id}`,
      });
    });
};

// Delete a Category with the specified id in the request
export const deleteOne = (req, res) => {
  const { id } = req.params;

  Category.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Category was deleted successfully!",
        });
      } else if (num === 0) {
        res.status(404).send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
        });
      } else {
        res.status(400).send({
          message: `Cannot delete Category with id=${id}.`
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: `Could not delete Category with id=${id}`,
      });
    });
};

// Delete all Categorys from the database.
export const deleteAll = (req, res) => {
  Category.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Category/ies were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categories.",
      });
    });
};
