import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const PlotChart = ({ countryData, selectedCountries }) => {
  const [plotData, setPlotData] = useState([]);
  console.log("countryData in plotchart", countryData);
  console.log("selectedCountries in plotchart", selectedCountries);
  useEffect(() => {
    const newData = countryData
      .filter((country) => selectedCountries.includes(country._id))
      .flatMap((country) =>
        country.data.map((data) => ({ ...data, countryId: country._id }))
      );
    setPlotData(newData);
  }, [countryData, selectedCountries]);

  return (
    <LineChart width={600} height={300} data={plotData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dt" />
      <YAxis />
      <Tooltip />
      <Legend />
      {selectedCountries.map((countryId, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey="AverageTemperature"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      ))}
    </LineChart>
  );
};

PlotChart.propTypes = {
  countryData: PropTypes.array.isRequired,
  selectedCountries: PropTypes.array.isRequired,
};

export default PlotChart;