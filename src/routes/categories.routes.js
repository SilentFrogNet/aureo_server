import express from "express";
import * as categories from "../controllers/categories.controller";

const category = express();

// Create a new Category
category.post("/", categories.create);

// Retrieve all Categories
category.get("/", categories.findAll);

// Retrieve a single Category with id
category.get("/:id", categories.findOne);

// Update a Category with id
category.put("/:id", categories.update);

// Delete a Category with id
category.delete("/:id", categories.deleteOne);

// Delete all Categories
category.delete("/", categories.deleteAll);

export default category;
