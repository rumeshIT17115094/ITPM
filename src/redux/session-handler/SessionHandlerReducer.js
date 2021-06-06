import {
  ADD_SESSION_HANDLER_FAILURE,
  ADD_SESSION_HANDLER_REQUEST,
  ADD_SESSION_HANDLER_SUCCESS,
  GET_SESSION_HANDLER_FAILURE,
  GET_SESSION_HANDLER_REQUEST,
  GET_SESSION_HANDLER_SUCCESS,
  UPDATE_SESSION_HANDLER_FAILURE,
  UPDATE_SESSION_HANDLER_REQUEST,
  UPDATE_SESSION_HANDLER_SUCCESS,
} from "redux/session-handler/SessionHandlerType";

const initialState = {
  loading: true,
  sessionHandler: {},
  error: "",
};

const SessionHandlerRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SESSION_HANDLER_REQUEST:
      return { ...state, loading: true };
    case ADD_SESSION_HANDLER_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionHandler: action.payload,
        error: "",
      };
    case ADD_SESSION_HANDLER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        sessionHandler: {},
      };
    default:
      return state;
  }
};

const getSessionHandlerReducer = (
  state = { loading: true, sessionHandlers: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_SESSION_HANDLER_REQUEST:
      return { ...state, loading: true };
    case GET_SESSION_HANDLER_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionHandlers: action.payload,
        error: "",
      };
    case GET_SESSION_HANDLER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        sessionHandlers: [],
      };
    default:
      return state;
  }
};

const update_SessionHandler_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_SESSION_HANDLER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SESSION_HANDLER_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_SESSION_HANDLER_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export {
  getSessionHandlerReducer,
  update_SessionHandler_Reducer,
  SessionHandlerRoomReducer,
};
