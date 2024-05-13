const initialState = {
  countries: {}
};

export const countryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COUNTRY_DATA':
     
      return {
        ...state,
        countries: {
          ...state.countries,
          [action.payload.data._id]: action.payload.data
        }
      };
    case 'REMOVE_COUNTRY_DATA':
      // Remove country data using _id
      // eslint-disable-next-line no-case-declarations, no-unused-vars
      const { [action.payload]: _, ...updatedCountries } = state.countries;
      return {
        ...state,
        countries: updatedCountries
      };
    default:
      return state;
  }
};