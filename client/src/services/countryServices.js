import { fetchData,postData } from './api';

export const fetchCountriesByName = async (name) => {
  try {
    const data = await fetchData(`countries/name?name=${name}`);
    console.log('Countries data:', data);
    // Handle the fetched data here
  } catch (error) {
    console.error('Error fetching countries data:', error);
    // Handle errors
  }
};

export const postCountryTemperature = async (country, startDate, endDate) => {
    try {
        const data = await postData('temperature', { country, startDate, endDate });
        console.log('Temperature data:', data);
        // Handle the fetched data here
    } catch (error) {
        console.error('Error fetching temperature data:', error);
        // Handle errors
    }
    }
    



