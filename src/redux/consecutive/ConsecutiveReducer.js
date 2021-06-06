import {
  ADD_CONSECUTIVE_SESSION_FAILURE,
  ADD_CONSECUTIVE_SESSION_REQUEST,
  ADD_CONSECUTIVE_SESSION_SUCCESS,
  GET_CONSECUTIVE_SESSION_FAILURE,
  GET_CONSECUTIVE_SESSION_REQUEST,
  GET_CONSECUTIVE_SESSION_SUCCESS,
  UPDATE_CONSECUTIVE_SESSION_FAILURE,
  UPDATE_CONSECUTIVE_SESSION_REQUEST,
  UPDATE_CONSECUTIVE_SESSION_SUCCESS,
} from "redux/consecutive/ConsecutiveType";

const initialState = {
  loading: true,
  ConsecutiveSession: {},
  error: "",
};

const ConsecutiveSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONSECUTIVE_SESSION_REQUEST:
      return { ...state, loading: true };
    case ADD_CONSECUTIVE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        ConsecutiveSession: action.payload,
        error: "",
      };
    case ADD_CONSECUTIVE_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        ConsecutiveSession: {},
      };
    default:
      return state;
  }
};

const getConsecutiveSessionsReducer = (
  state = { loading: true, ConsecutiveSessions: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_CONSECUTIVE_SESSION_REQUEST:
      return { ...state, loading: true };
    case GET_CONSECUTIVE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        ConsecutiveSessions: action.payload,
        error: "",
      };
    case GET_CONSECUTIVE_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        ConsecutiveSessions: [],
      };
    default:
      return state;
  }
};

const update_Consecutivesession_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_CONSECUTIVE_SESSION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CONSECUTIVE_SESSION_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_CONSECUTIVE_SESSION_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export {
  ConsecutiveSessionReducer,
  getConsecutiveSessionsReducer,
  update_Consecutivesession_Reducer,
};
