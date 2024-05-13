import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PlotChart from "./PlotChart.jsx";

export const CountryInfoArea = ({ countryData }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const handleAddCountry = (countryId) => {
      console.log("Adding country:", countryId);
      setSelectedCountries([...selectedCountries, countryId]);
    };

    // const handleRemoveCountry = (countryId) => {
    //   console.log("Removing country:", countryId);
    //   setSelectedCountries(selectedCountries.filter((id) => id !== countryId));
    // };

    countryData.forEach((country) => {
      const isNewCountry = !selectedCountries.includes(country._id);
      if (isNewCountry) {
        handleAddCountry(country._id);
      }
    });
  }, [countryData, selectedCountries]);

  const handleRemoveCountry = (countryId) => {
    console.log("Removing country:", countryId);
    setSelectedCountries(selectedCountries.filter((id) => id !== countryId));
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
};
