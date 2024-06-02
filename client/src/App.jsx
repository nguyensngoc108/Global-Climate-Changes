import CountrySelectionBar from './components/CountrySelectionBar.jsx';
import { useState } from 'react';
import {CountryInfoArea} from './components/CountryInfoArea.jsx';
import './App.css';

const App = () => {
  const [countryData, setCountryData] = useState([]);

  const handleAddCountry = (data) => {
    setCountryData([...countryData, data]);
  };

  const title ={
    fontsize: "64px",
    fontWeight: "500",
    textAlign: "center",
    color: "Yellow",
    padding: "10px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5),-2px -2px 4px rgba(0, 0, 0, 0.5),2px -2px 4px rgba(0, 0, 0, 0.5),-2px 2px 4px rgba(0, 0, 0, 0.5)",
    marginBottom: "0",
    fontFamily: "Georgia"
  }

  // const introduction ={
  //     textAlign: "center",
  //     boxsizing: "border-box",
  //     lineheight:" 1.75em",
  //     fontweight: '0',
  //     wordwrap: "break-word",
  //     fontvariantnumeric: 'proportional-nums',
  //     marginleft: '80px',
  //     marginright: '80px',
  //   }
  
  return (

    
    <div>
      <h1  style={title} >Global Temperature Analysis</h1>
      <div>
        <h3 className="introduction" >This project aims to explore and visualize the Earth&apos;s 
        surface temperature data from 1983 to 2013, sourced from ground-based weather 
        stations, satellite observations, and climate models, and grouped by countries.
        By presenting this temperature data interactively and intuitively, 
        the project aims to raise awareness about the urgency of addressing 
        climate change and support decision-making for mitigation efforts at 
        national and international levels.</h3>
    </div>
      <div className="container">
        <CountrySelectionBar  onAddCountry={handleAddCountry}/>
        <CountryInfoArea countryData={countryData} />
      </div>
    </div>
  );
};

export default App;
