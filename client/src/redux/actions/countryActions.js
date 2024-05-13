export const addCountryData = (responseData) => {
  return {
    type: 'ADD_COUNTRY_DATA',
    payload: responseData
  };
};

export const removeCountryData = (countryId) => ({
  type: 'REMOVE_COUNTRY_DATA',
  payload: countryId
});