// countryController.js
import { Country } from "../models/Countries.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export const lookupCountry = async (req, res, next) => {
  try {
    const data = req?.body;

    const country = await Country.find({
      $or: [{ Country: { $regex: data.name, $options: "i" } }],
    })
      .sort({ Country: -1 })
      .select("Country AverageTemperature");
    // const country = await Country
    //     .find({
    //     }).limit(5);
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    return res.status(200).json({ country });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTemperatureByCountryAndDate = async (req, res, next) => {
  try {
    const { country, startDate, endDate } = req.body;
    const temperatures = await Country.find({
      Country: country,
      dt: { $gte: startDate, $lte: endDate },
    });
    res.status(200).json({ temperatures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCountriesTemperature = async (req, res, next) => {
  const { date } = req.body;
  const temperatures = await Country.find({
    dt: date,
  }).select("Country AverageTemperature AverageTemperatureUncertainty");
  res.status(200).json({ temperatures });
};

export const getAll = async (req, res, next) => {
  const data = await Country.find({}).distinct("Country");
  res.status(200).json({ data });
};

export const getCountriesByDate = async (req, res, next) => {
  try {
    const { dt } = req.body; // get the date from the request body

    const countries = await Country.find({
      dt,
      AverageTemperature: { $exists: true, $ne: null },
    });

    if (!countries || countries.length === 0) {
      return res
        .status(404)
        .json({ message: "No countries found for this date" });
    }

    return res.status(200).json(countries);
  } catch (error) {
    next(error);
  }
};
