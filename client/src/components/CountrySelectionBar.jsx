import { useState, useEffect, useRef } from "react";
import {fetchData, postData } from "../services/api.js";
import DatePicker from "./DatePicker";
import PropTypes from "prop-types";
import SubmitButton from "./SubmitButton";
// import CountryInfoArea from './CountryInfoArea'; // Import CountryInfoArea component
import { addCountryData } from "../redux/actions/countryActions.js";
import { useDispatch } from "react-redux";
// import axios from "axios";

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
  
  
  // const mystyle = {
  //   color: "white",
  //   backgroundColor: "green",
  //   padding: "20px",
  //   fontFamily: "Arial",
  //   alignContent: "center",
  //   // display: "flex",
  //   alignItems: "center"
  // };
const style = {
    backgroundColor: "#90EE90",
    padding: "20px 25px",
    boxShadow:" 0px 2px 2px lightgray",
    borderRadius: "5px",
    outline: "0",
    border: "0",
    // textTransform: "uppercase",
    margin: "10px 0px",
    cursor: "pointer",
    opacity: "1.3",
    display: 'flex', 
    flexDirection: 'column', 
    textAlign: 'center'
};

const style_elemet ={
  borderRadius: "5px",
  outline: "0",
  border: "0",
  cursor: "pointer",
  opacity: "1.3",
  padding: '8px 0px',
  alignItems: 'center',
}

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await fetchData("countries/");
        // const data = await axios.get("http://localhost:8000/api/countries/");
        console.log(data)
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
    <div style={style} ref={searchRef}>
      <div style={{paddingBottom: '5px', textAlign: 'center',}}>
        <input 
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search countries"
        />
      </div>
      {showCountryList && (
        <div >
          {displayCountries.map((country) => (
            <div key={country.id} onClick={() => handleCountrySelect(country)}>
              {country.country}
            </div>
          ))}
        </div>
      )}
      {selectedCountry && (
        <>
          <div style={style_elemet}><DatePicker 
            label = "From"
            selectedDate={startDate}
            onChange={handleStartDateChange}
          /></div>
          <div style={style_elemet}><DatePicker
            label="To"
            selectedDate={endDate}
            onChange={handleEndDateChange}
          /></div>
          <div style={{paddingTop: '5px'}}><SubmitButton  onSubmit={handleSubmit} /></div>
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
