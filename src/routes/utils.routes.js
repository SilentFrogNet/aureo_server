import express from "express";
import * as utils from "../controllers/utils.controller";

const utilities = express();

utilities.get("/health", utils.health);

export default utilities;
