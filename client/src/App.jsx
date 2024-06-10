import { useState } from 'react';
import CountrySelectionBar from './components/CountrySelectionBar.jsx';
import CountryInfoArea from './components/CountryInfoArea.jsx';
import './style/style.css';
const App = () => {
  const [countryData, setCountryData] = useState([]);

  const handleAddCountry = (data) => {
    setCountryData((prevData) => {
      const existingCountryIndex = prevData.findIndex(
        (country) => country._id === data._id
      );

      if (existingCountryIndex !== -1) {
        // Update existing country data
        const updatedData = [...prevData];
        updatedData[existingCountryIndex] = data;
        return updatedData;
      } else {
        // Add new country data
        return [...prevData, data];
      }
    });
  };

  return (
    <div>
      <h1>Global Temperature Analysis</h1>
      <div className="container">
        <CountrySelectionBar onAddCountry={handleAddCountry} />
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
