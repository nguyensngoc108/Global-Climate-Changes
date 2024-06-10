import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PlotChart from "./PlotChart.jsx";

const CountryInfoArea = ({ countryData, setCountryData }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const newSelectedCountries = countryData.map((country) => country._id);
    setSelectedCountries(newSelectedCountries);
  }, [countryData]);

  const handleRemoveCountry = (countryId) => {
    console.log("Removing country:", countryId);
    const updatedSelectedCountries = selectedCountries.filter((id) => id !== countryId);
    setSelectedCountries(updatedSelectedCountries);

    const updatedCountryData = countryData.filter((country) => country._id !== countryId);
    setCountryData(updatedCountryData);
  };

  const renderCountryData = () => {
    return countryData.map((country) => (
      <div key={country._id}>
        {selectedCountries.includes(country._id) && (
          <>
            <h2>{country.Country}</h2>
            <p>Start Date: {country.startDate}</p>
            <p>End Date: {country.endDate}</p>
            <button onClick={() => handleRemoveCountry(country._id)}>
              Remove
            </button>
          </>
        )}
      </div>
    ));
  };

  return (
    <div>
      <PlotChart
        countryData={countryData}
        selectedCountries={selectedCountries}
      />
      <h1>Country Data</h1>
      {renderCountryData()}
    </div>
  );
};

CountryInfoArea.propTypes = {
  countryData: PropTypes.array.isRequired,
  setCountryData: PropTypes.func.isRequired,
};

export default CountryInfoArea;
