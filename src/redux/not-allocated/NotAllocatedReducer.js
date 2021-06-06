import {
  ADD_NOT_ALLOCATED_FAILURE,
  ADD_NOT_ALLOCATED_REQUEST,
  ADD_NOT_ALLOCATED_SUCCESS,
  GET_NOT_ALLOCATED_FAILURE,
  GET_NOT_ALLOCATED_REQUEST,
  GET_NOT_ALLOCATED_SUCCESS,
  UPDATE_NOT_ALLOCATED_FAILURE,
  UPDATE_NOT_ALLOCATED_REQUEST,
  UPDATE_NOT_ALLOCATED_SUCCESS,
} from "redux/not-allocated/NotAllocatedType";

const initialState = {
  loading: true,
  notAllocate: {},
  error: "",
};

const NotAllocateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOT_ALLOCATED_REQUEST:
      return { ...state, loading: true };
    case ADD_NOT_ALLOCATED_SUCCESS:
      return {
        ...state,
        loading: false,
        notAllocate: action.payload,
        error: "",
      };
    case ADD_NOT_ALLOCATED_FAILURE:
      return { ...state, loading: false, error: action.error, notAllocate: {} };
    default:
      return state;
  }
};

const getNotAllocateReducer = (
  state = { loading: true, notAllocates: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_NOT_ALLOCATED_REQUEST:
      return { ...state, loading: true };
    case GET_NOT_ALLOCATED_SUCCESS:
      return {
        ...state,
        loading: false,
        notAllocates: action.payload,
        error: "",
      };
    case GET_NOT_ALLOCATED_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        notAllocates: [],
      };
    default:
      return state;
  }
};

const update_NotAllocate_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_NOT_ALLOCATED_REQUEST:
      return { ...state, loading: true };
    case UPDATE_NOT_ALLOCATED_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_NOT_ALLOCATED_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export {
  update_NotAllocate_Reducer,
  getNotAllocateReducer,
  NotAllocateReducer,
};
