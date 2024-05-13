// countryController.js
import { Country } from "../models/Countries.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
// library to generate id
import { v4 as uuidv4 } from "uuid";

dayjs.extend(utc);

export const lookupCountry = async (req, res, next) => {
  try {
    // using get api
    let name = req?.params?.name;
    // lowercase the name and convert it to a string
    name = name.toString().toLowerCase();
    console.log(name);
    const country = await Country.find({
      $or: [{ Country: { $regex: name, $options: "i" } }],
    })
      .distinct("Country")
      .sort();
    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }
    return res.status(200).json({ data: country });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTemperatureByCountryAndDate = async (req, res, next) => {
  try {
    console.log("country", req.body);
    const { country, startDate, endDate } = req.body;

    const data = await Country.aggregate([
      {
        $match: {
          Country: country,
          dt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        },
      },
      {
        $sort: { dt: 1 }, // Sort by dt field in ascending order
      },
      {
        $group: {
          // generate a unique id for each group
          _id: uuidv4(),
          Country: { $first: "$Country" },
          startDate: { $first: "$dt" }, // Get the oldest date
          endDate: { $last: "$dt" }, // Get the latest date
          data: {
            $push: {
              dt: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$dt",
                },
              },
              AverageTemperature: "$AverageTemperature",
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          Country: 1,
          startDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$startDate",
            },
          },
          endDate: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$endDate",
            },
          },
          data: 1,
        },
      },
    ]);

    if (data.length === 0) {
      return res.status(404).json({
        message: "No data found for the specified country and date range",
      });
    }

    res.status(200).json({ data: data[0] }); // Returning first element of data array
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
  try {
    const countries = await Country.aggregate([
      {
        $group: {
          _id: "$Country", // group by the Country field
          id: { $first: "$_id" }, // get the ID of the first document in each group
        },
      },
      {
        $project: {
          _id: 0, // exclude the _id field
          country: "$_id", // rename _id to country
          id: 1, // include the id field
        },
      },
      {
        $sort: {
          country: 1, // sort by country in ascending order
        },
      },
    ]);

    return res.status(200).json({ data: countries });
  } catch (error) {
    next(error);
  }
};

export const getCountriesByDate = async (req, res, next) => {
  try {
    const { dt } = req.body;

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
