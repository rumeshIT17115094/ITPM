import {
  ADD_NOT_ALLOCATED_ROOM_FAILURE,
  ADD_NOT_ALLOCATED_ROOM_REQUEST,
  ADD_NOT_ALLOCATED_ROOM_SUCCESS,
  GET_NOT_ALLOCATED_ROOM_FAILURE,
  GET_NOT_ALLOCATED_ROOM_REQUEST,
  GET_NOT_ALLOCATED_ROOM_SUCCESS,
  UPDATE_NOT_ALLOCATED_ROOM_FAILURE,
  UPDATE_NOT_ALLOCATED_ROOM_REQUEST,
  UPDATE_NOT_ALLOCATED_ROOM_SUCCESS,
} from "redux/notAllocated-room/NotAllocatedRoomType";

const initialState = {
  loading: true,
  notAllocateRoom: {},
  error: "",
};

const NotAllocateRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOT_ALLOCATED_ROOM_REQUEST:
      return { ...state, loading: true };
    case ADD_NOT_ALLOCATED_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        notAllocateRoom: action.payload,
        error: "",
      };
    case ADD_NOT_ALLOCATED_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        notAllocateRoom: {},
      };
    default:
      return state;
  }
};

const getNotAllocateRoomReducer = (
  state = { loading: true, notAllocateRooms: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_NOT_ALLOCATED_ROOM_REQUEST:
      return { ...state, loading: true };
    case GET_NOT_ALLOCATED_ROOM_SUCCESS:
      return {
        ...state,
        loading: false,
        notAllocateRooms: action.payload,
        error: "",
      };
    case GET_NOT_ALLOCATED_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        notAllocateRooms: [],
      };
    default:
      return state;
  }
};

const update_NotAllocateRoom_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_NOT_ALLOCATED_ROOM_REQUEST:
      return { ...state, loading: true };
    case UPDATE_NOT_ALLOCATED_ROOM_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_NOT_ALLOCATED_ROOM_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export {
  NotAllocateRoomReducer,
  update_NotAllocateRoom_Reducer,
  getNotAllocateRoomReducer,
};
