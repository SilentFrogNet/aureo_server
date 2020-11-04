import express from "express";
import category from "./categories.routes";
import utilities from "./utils.routes";

const app = express();

app.use("/", utilities);
app.use("/categories", category);

export default app;
