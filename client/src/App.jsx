import CountrySelectionBar from './components/CountrySelectionBar.jsx';
import { useState } from 'react';
import {CountryInfoArea} from './components/CountryInfoArea.jsx';

const App = () => {
  const [countryData, setCountryData] = useState([]);

  const handleAddCountry = (data) => {
    setCountryData([...countryData, data]);
  };
  return (

    
    <div>
      <h1>Global Temperature Analysis</h1>
      <div className="container">
        <CountrySelectionBar  onAddCountry={handleAddCountry}/>
        <CountryInfoArea countryData={countryData} />
      </div>
    </div>
  );
};

export default App;
