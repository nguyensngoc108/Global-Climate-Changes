import { useState, useEffect, useRef } from "react";
import { fetchData, postData } from "../services/api.js";
import DatePicker from "./DatePicker";
import PropTypes from "prop-types";
import SubmitButton from "./SubmitButton";
// import CountryInfoArea from './CountryInfoArea'; // Import CountryInfoArea component
import { addCountryData } from "../redux/actions/countryActions.js";
import { useDispatch } from "react-redux";

const CountrySelectionBar = ({ onAddCountry }) => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCountries, setDisplayCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  // const [countryData, setCountryData] = useState([]); // State to hold country data
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await fetchData("countries/");
        setCountries(data.data);
        setDisplayCountries(data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    // Close country list when clicking outside the search bar
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowCountryList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredCountries = countries.filter((country) =>
      country.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayCountries(filteredCountries);
    setShowCountryList(true); // Show country list when typing in search bar
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.country);
    setSearchTerm(country.country); // update searchTerm with the selected country
    setShowCountryList(false); // Hide country list after selection
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting data:", selectedCountry, startDate, endDate);
      const data = {
        country: selectedCountry,
        startDate: startDate,
        endDate: endDate,
      };
      const responseData = await postData("countries/search", data);
      console.log("Response data:", responseData);

      dispatch(addCountryData(responseData));
      onAddCountry(responseData.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div ref={searchRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search countries"
      />
      {showCountryList && (
        <div>
          {displayCountries.map((country) => (
            <div key={country.id} onClick={() => handleCountrySelect(country)}>
              {country.country}
            </div>
          ))}
        </div>
      )}
      {selectedCountry && (
        <>
          <DatePicker
            label="From"
            selectedDate={startDate}
            onChange={handleStartDateChange}
          />
          <DatePicker
            label="To"
            selectedDate={endDate}
            onChange={handleEndDateChange}
          />
          <SubmitButton onSubmit={handleSubmit} />
        </>
      )}
      {/* <CountryInfoArea countryData={countryData} /> */}
    </div>
  );
};
CountrySelectionBar.propTypes = {
  onAddCountry: PropTypes.func.isRequired,
};

export default CountrySelectionBar;
