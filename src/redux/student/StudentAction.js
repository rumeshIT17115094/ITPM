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
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addStudent = (studentData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_STUDENT_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("students")
        .add({
          ...studentData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_STUDENT_SUCCESS,
            payload: {
              ...studentData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_STUDENT_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewStudents = () => {
  return async (dispatch) => {
    dispatch({ type: GET_STUDENT_REQUEST });
    try {
      db.collection("students")
        .orderBy("timestamp", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            year_semister: doc.data().year_semister,
            programme: doc.data().programme,
            group_number: doc.data().group_number,
            subGroup_number: doc.data().subGroup_number,
            groupId: doc.data().groupId,
            subGroupId: doc.data().subGroupId,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_STUDENT_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_STUDENT_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateStudents = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_STUDENT_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("students")
        .doc(values.docId)
        .set(
          {
            ...values,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_STUDENT_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_STUDENT_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_STUDENT_FAILURE,
        error: err,
      });
    }
  };
};

export { UpdateStudents, viewStudents, addStudent };
