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
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addConsecutiveSession = (sessionData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_CONSECUTIVE_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("consecutiveSessions")
        .add({
          ...sessionData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_CONSECUTIVE_SESSION_SUCCESS,
            payload: {
              ...sessionData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_CONSECUTIVE_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewConsecutiveSession = () => {
  return async (dispatch) => {
    dispatch({ type: GET_CONSECUTIVE_SESSION_REQUEST });
    try {
      db.collection("consecutiveSessions")
        .orderBy("timestamp", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            lecture: doc.data().lectureSession,
            tutorial: doc.data().tutorialSession,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_CONSECUTIVE_SESSION_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_CONSECUTIVE_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const updateConsecutiveSession = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CONSECUTIVE_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("consecutiveSessions")
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
            type: UPDATE_CONSECUTIVE_SESSION_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_CONSECUTIVE_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_CONSECUTIVE_SESSION_FAILURE,
        error: err,
      });
    }
  };
};

export {
  addConsecutiveSession,
  viewConsecutiveSession,
  updateConsecutiveSession,
};
