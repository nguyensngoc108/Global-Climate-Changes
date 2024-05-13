import express from "express";
import { lookupCountry,getAllCountriesTemperature,getAll,getTemperatureByCountryAndDate, getCountriesByDate } from "../controllers/countryController.js";

const route = express.Router();



route.get("/", getAll);

route.get("/name/:name", lookupCountry);

route.post("/search", getTemperatureByCountryAndDate);


route.get("/temperature", getAllCountriesTemperature);


route.post("/date", getCountriesByDate)

export default route;
