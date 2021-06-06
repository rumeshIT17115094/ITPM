import {
  ADD_LECTURER_REQUEST,
  ADD_LECTURER_SUCCESS,
  ADD_LECTURER_FAILURE,
  GET_LECTURER_REQUEST,
  GET_LECTURER_SUCCESS,
  GET_LECTURER_FAILURE,
  UPDATE_LECTURER_FAILURE,
  UPDATE_LECTURER_REQUEST,
  UPDATE_LECTURER_SUCCESS,
} from "redux/lecturer/LecturerType";
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addLecturer = (lecturerData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_LECTURER_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("lecturers")
        .get()
        .then(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            emp_id: doc.data().emp_id,
            id: doc.id,
          }));

          const isExists = await tempData.filter(
            (data) => data.emp_id === lecturerData.emp_id
          );

          if (isExists.length === 0) {
            db.collection("lecturers")
              .add({
                ...lecturerData,
              })
              .then(() => {
                dispatch({
                  type: ADD_LECTURER_SUCCESS,
                  payload: {
                    ...lecturerData,
                    timestamp,
                  },
                });
              })
              .catch((err) => {
                dispatch({
                  type: ADD_LECTURER_FAILURE,
                  error: err,
                });
              });
          } else {
            dispatch({
              type: ADD_LECTURER_FAILURE,
              error: "Data already exists",
            });
          }
        });
    } catch (err) {}
  };
};

const viewLecturer = () => {
  return async (dispatch) => {
    dispatch({ type: GET_LECTURER_REQUEST });
    try {
      db.collection("lecturers")
        .orderBy("name", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            emp_id: doc.data().emp_id,
            name: doc.data().name,
            faculty: doc.data().faculty,
            department: doc.data().department,
            center: doc.data().center,
            building: doc.data().building,
            level: doc.data().level,
            rank: doc.data().rank,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_LECTURER_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_LECTURER_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateLecturerDetails = ({
  docId,
  name,
  emp_id,
  faculty,
  center,
  department,
  building,
  level,
  rank,
}) => {
  return async (dispatch) => {
    console.log("emp_id", emp_id);
    dispatch({ type: UPDATE_LECTURER_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("lecturers")
        .doc(docId)
        .set(
          {
            emp_id: emp_id,
            name: name,
            faculty: faculty,
            department: department,
            center: center,
            building: building,
            level: level,
            rank: rank,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_LECTURER_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_LECTURER_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_LECTURER_FAILURE,
        error: err,
      });
    }
  };
};

export { addLecturer, viewLecturer, UpdateLecturerDetails };
