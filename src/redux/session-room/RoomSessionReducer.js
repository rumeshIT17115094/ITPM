import {
  ADD_ROOM_SESSION_FAILURE,
  ADD_ROOM_SESSION_REQUEST,
  ADD_ROOM_SESSION_SUCCESS,
  GET_ROOM_SESSION_FAILURE,
  GET_ROOM_SESSION_REQUEST,
  GET_ROOM_SESSION_SUCCESS,
  UPDATE_ROOM_SESSION_FAILURE,
  UPDATE_ROOM_SESSION_REQUEST,
  UPDATE_ROOM_SESSION_SUCCESS,
} from "redux/session-room/RoomSessionType";

const initialState = {
  loading: true,
  RoomSession: {},
  error: "",
};

const RoomSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM_SESSION_REQUEST:
      return { ...state, loading: true };
    case ADD_ROOM_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        RoomSession: action.payload,
        error: "",
      };
    case ADD_ROOM_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        RoomSession: {},
      };
    default:
      return state;
  }
};

const getRoomSessionsReducer = (
  state = { loading: true, RoomSessions: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_ROOM_SESSION_REQUEST:
      return { ...state, loading: true };
    case GET_ROOM_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        RoomSessions: action.payload,
        error: "",
      };
    case GET_ROOM_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        RoomSessions: [],
      };
    default:
      return state;
  }
};

const update_Roomsession_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_ROOM_SESSION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ROOM_SESSION_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_ROOM_SESSION_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export {
  RoomSessionReducer,
  update_Roomsession_Reducer,
  getRoomSessionsReducer,
};
