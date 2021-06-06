import {
  ADD_SESSION_FAILURE,
  ADD_SESSION_REQUEST,
  ADD_SESSION_SUCCESS,
  GET_SESSION_FAILURE,
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  UPDATE_SESSION_FAILURE,
  UPDATE_SESSION_REQUEST,
  UPDATE_SESSION_SUCCESS,
} from "redux/sessions/SessionType";

const initialState = {
  loading: true,
  session: {},
  error: "",
};

const SessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SESSION_REQUEST:
      return { ...state, loading: true };
    case ADD_SESSION_SUCCESS:
      return { ...state, loading: false, session: action.payload, error: "" };
    case ADD_SESSION_FAILURE:
      return { ...state, loading: false, error: action.error, session: {} };
    default:
      return state;
  }
};

const getSessionsReducer = (
  state = { loading: true, sessions: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_SESSION_REQUEST:
      return { ...state, loading: true };
    case GET_SESSION_SUCCESS:
      return { ...state, loading: false, sessions: action.payload, error: "" };
    case GET_SESSION_FAILURE:
      return { ...state, loading: false, error: action.error, sessions: [] };
    default:
      return state;
  }
};

const update_session_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_SESSION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SESSION_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_SESSION_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export { SessionReducer, getSessionsReducer, update_session_Reducer };
