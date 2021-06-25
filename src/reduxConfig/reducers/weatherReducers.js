const initialState = {
  weatherList: [],
};

const weatherReducers = (state = initialState, action) => {
  switch (action.type) {
    case "WRITE_WEATHER": {
      return {
        ...state,
        weatherList: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default weatherReducers;
