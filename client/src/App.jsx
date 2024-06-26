import { useState } from 'react';
import CountrySelectionBar from './components/CountrySelectionBar.jsx';
import CountryInfoArea from './components/CountryInfoArea.jsx';
import CountryMap from './components/CountryMaps.jsx';
import './style/style.css';
const App = () => {
  const [countryData, setCountryData] = useState([]);

  const handleAddCountry = (data) => {
    setCountryData((prevData) => {
      const existingCountryIndex = prevData.findIndex(
        (country) => country._id === data._id
      );

      if (existingCountryIndex !== -1) {
      
        const updatedData = [...prevData];
        updatedData[existingCountryIndex] = data;
        return updatedData;
      } else {

        return [...prevData, data];
      }
    });
  };

  return (
    <div>
      <h1>Global Temperature Analysis</h1>
      <div className="container">
        <CountrySelectionBar onAddCountry={handleAddCountry} />
        <CountryMap countryData={countryData} />
        {countryData.length > 0 && (
          <CountryInfoArea
            countryData={countryData}
            setCountryData={setCountryData}
          />
        )}
      </div>
    </div>
  );
};

export default App;
