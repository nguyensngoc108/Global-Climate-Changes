import { useState, useEffect, useRef } from "react";
import { fetchData, postData } from "../services/api.js";
import DatePicker from "./DatePicker.jsx";
import PropTypes from "prop-types";
import SubmitButton from "./SubmitButton.jsx";
import { addCountryData } from "../redux/actions/countryActions.js";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

const CountrySelectionBar = ({ onAddCountry }) => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCountries, setDisplayCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
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

  const handleSearch = debounce((searchTerm) => {
    const filteredCountries = countries.filter((country) =>
      country.country.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayCountries(filteredCountries);
    setShowCountryList(true);
  }, 300);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country.country);
    setSearchTerm(country.country);
    setShowCountryList(false);
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

      dispatch(addCountryData(responseData));
      onAddCountry(responseData.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="country-selection-bar" ref={searchRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search countries"
        aria-label="Search countries"
      />
      {showCountryList && (
        <div className="country-list" aria-expanded="true">
          {displayCountries.map((country) => (
            <div
              key={country.id}
              onClick={() => handleCountrySelect(country)}
              className="country-item"
              role="option"
            >
              {country.country}
            </div>
          ))}
        </div>
      )}
      {selectedCountry && (
        <div className="date-picker-container">
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
        </div>
      )}
    </div>
  );
};

CountrySelectionBar.propTypes = {
  onAddCountry: PropTypes.func.isRequired,
};

export default CountrySelectionBar;
