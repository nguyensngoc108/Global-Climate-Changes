import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

import { connectDB } from "./config/db.js";
import countryRoute from "./routes/countryRoute.js";

import morgan from "morgan";


connectDB();

app.use(morgan('combined'));
app.use(express.json());

app.use("/api/countries", countryRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
