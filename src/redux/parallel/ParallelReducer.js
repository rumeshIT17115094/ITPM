import {
  ADD_PARALLEL_SESSION_FAILURE,
  ADD_PARALLEL_SESSION_REQUEST,
  ADD_PARALLEL_SESSION_SUCCESS,
  GET_PARALLEL_SESSION_FAILURE,
  GET_PARALLEL_SESSION_REQUEST,
  GET_PARALLEL_SESSION_SUCCESS,
  UPDATE_PARALLEL_SESSION_FAILURE,
  UPDATE_PARALLEL_SESSION_REQUEST,
  UPDATE_PARALLEL_SESSION_SUCCESS,
} from "redux/parallel/ParallelType";

const initialState = {
  loading: true,
  ParallelSession: {},
  error: "",
};

const ParallelSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARALLEL_SESSION_REQUEST:
      return { ...state, loading: true };
    case ADD_PARALLEL_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        ParallelSession: action.payload,
        error: "",
      };
    case ADD_PARALLEL_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        ParallelSession: {},
      };
    default:
      return state;
  }
};

const getParallelSessionsReducer = (
  state = { loading: true, ParallelSessions: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_PARALLEL_SESSION_REQUEST:
      return { ...state, loading: true };
    case GET_PARALLEL_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        ParallelSessions: action.payload,
        error: "",
      };
    case GET_PARALLEL_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        ParallelSessions: [],
      };
    default:
      return state;
  }
};

const update_Parallelsession_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_PARALLEL_SESSION_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PARALLEL_SESSION_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_PARALLEL_SESSION_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export {
  ParallelSessionReducer,
  getParallelSessionsReducer,
  update_Parallelsession_Reducer,
};
