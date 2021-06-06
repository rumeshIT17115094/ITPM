import {
  ADD_STUDENT_FAILURE,
  ADD_STUDENT_REQUEST,
  ADD_STUDENT_SUCCESS,
  GET_STUDENT_FAILURE,
  GET_STUDENT_REQUEST,
  GET_STUDENT_SUCCESS,
  UPDATE_STUDENT_FAILURE,
  UPDATE_STUDENT_REQUEST,
  UPDATE_STUDENT_SUCCESS,
} from "redux/student/StudentType";

const initialState = {
  loading: true,
  student: {},
  error: "",
};

const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT_REQUEST:
      return { ...state, loading: true };
    case ADD_STUDENT_SUCCESS:
      return { ...state, loading: false, student: action.payload, error: "" };
    case ADD_STUDENT_FAILURE:
      return { ...state, loading: false, error: action.error, student: {} };
    default:
      return state;
  }
};

const getStudentsReducer = (
  state = { loading: true, students: [], error: "" },
  action
) => {
  switch (action.type) {
    case GET_STUDENT_REQUEST:
      return { ...state, loading: true };
    case GET_STUDENT_SUCCESS:
      return { ...state, loading: false, students: action.payload, error: "" };
    case GET_STUDENT_FAILURE:
      return { ...state, loading: false, error: action.error, students: [] };
    default:
      return state;
  }
};

const update_student_Reducer = (
  state = { loading: true, message: "", error: "" },
  action
) => {
  switch (action.type) {
    case UPDATE_STUDENT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_STUDENT_SUCCESS:
      return { ...state, loading: false, message: action.message, error: "" };
    case UPDATE_STUDENT_FAILURE:
      return { ...state, loading: false, message: "", error: action.error };
    default:
      return state;
  }
};

export { StudentReducer, update_student_Reducer, getStudentsReducer };
