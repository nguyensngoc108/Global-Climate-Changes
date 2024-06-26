// CountryMap.jsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const CountryMap = ({ countryData }) => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const promises = countryData.map(async (country) => {
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${country.Country}&key=898cfbf620d4440e8d6b317c93fd537b`
        );
        const { lat, lng } = response.data.results[0].geometry;
        return { ...country, lat, lng };
      });

      const results = await Promise.all(promises);
      setCoordinates(results);
    };

    fetchCoordinates();
  }, [countryData]);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates.map((country) => (
        <Marker key={country._id} position={[country.lat, country.lng]}>
          <Popup>
            <strong>{country.Country}</strong>
            <br />
            Avg Temperature: {country.avgTemp}°C
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

CountryMap.propTypes = {
  countryData: PropTypes.array.isRequired,
};

export default CountryMap;
