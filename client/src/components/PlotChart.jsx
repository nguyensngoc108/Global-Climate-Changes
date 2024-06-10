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
  Brush,
  ResponsiveContainer,
} from "recharts";
import { DateTime } from "luxon";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088fe"];

const PlotChart = ({ countryData, selectedCountries }) => {
  const [plotData, setPlotData] = useState([]);

  useEffect(() => {
    const newData = countryData
      .filter((country) => selectedCountries.includes(country._id))
      .flatMap((country) =>
        country.data.map((data) => ({
          ...data,
          countryId: country._id,
          Country: country.Country,
          dt: DateTime.fromISO(data.dt).toFormat("yyyy-MM-dd"), // Format date for better tooltip
        }))
      );
    setPlotData(newData);
  }, [countryData, selectedCountries]);

  const formatXAxis = (tickItem) => {
    return DateTime.fromISO(tickItem).toFormat("MMM yyyy");
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={plotData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="dt"
          tickFormatter={formatXAxis}
          type="category"
          interval="preserveStartEnd"
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label) =>
            DateTime.fromISO(label).toFormat("yyyy-MM-dd")
          }
        />
        <Legend />
        <Brush dataKey="dt" height={30} stroke="#8884d8" />
        {selectedCountries.map((countryId, index) => {
          const country = countryData.find((c) => c._id === countryId);
          return (
            <Line
              key={countryId}
              type="monotone"
              dataKey="AverageTemperature"
              data={plotData.filter((data) => data.countryId === countryId)}
              stroke={colors[index % colors.length]}
              name={country.Country}
              activeDot={{ r: 8 }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

PlotChart.propTypes = {
  countryData: PropTypes.array.isRequired,
  selectedCountries: PropTypes.array.isRequired,
};

export default PlotChart;
