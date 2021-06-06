import {
  ADD_LOCATION_FAILURE,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_SUCCESS,
} from "redux/location/LocationType";

const initialState = {
  loading: true,
  lecturer: {},
  error: "",
};

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCATION_REQUEST:
      return { ...state, loading: true };
    case ADD_LOCATION_SUCCESS:
      return { ...state, loading: false, location: action.payload, error: "" };
    case ADD_LOCATION_FAILURE:
      return { ...state, loading: false, error: action.error, location: {} };
    default:
      return state;
  }
};

const getLocationsReducer = (
  state = { loading: true, loactions: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_LOCATION_REQUEST:
      return { ...state, loading: true };
    case GET_LOCATION_SUCCESS:
      return { ...state, loading: false, loactions: action.payload, error: "" };
    case GET_LOCATION_FAILURE:
      return { ...state, loading: false, error: action.error, loactions: [] };
    default:
      return state;
  }
};

const update_location_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_LOCATION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_LOCATION_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_LOCATION_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export { LocationReducer, getLocationsReducer, update_location_Reducer };
