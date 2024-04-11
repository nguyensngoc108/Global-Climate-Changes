import express from "express";
import { lookupCountry,getAllCountriesTemperature,getAll,getTemperatureByCountryAndDate } from "../controllers/countryController.js";

const route = express.Router();

route.get("/", getAll);

route.get("/temperature", getAllCountriesTemperature);

route.post("/temperature", getTemperatureByCountryAndDate);

route.post("/name", lookupCountry);

export default route;
