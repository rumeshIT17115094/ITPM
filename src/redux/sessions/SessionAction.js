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
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addSession = (sessionData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const generateSession =
        sessionData.lecturer +
        "-" +
        sessionData.subjectCode +
        "-" +
        sessionData.subject +
        "-" +
        sessionData.group +
        "-" +
        sessionData.tag +
        "-" +
        sessionData.studentsCount +
        "-" +
        sessionData.duration;
      db.collection("sessions")
        .add({
          ...sessionData,
          generateSession,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_SESSION_SUCCESS,
            payload: {
              ...sessionData,
              generateSession,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewSession = () => {
  return async (dispatch) => {
    dispatch({ type: GET_SESSION_REQUEST });
    try {
      db.collection("sessions")
        .orderBy("timestamp", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            lecturer: doc.data().lecturer,
            tag: doc.data().tag,
            group: doc.data().group,
            subject: doc.data().subject,
            studentsCount: doc.data().studentsCount,
            duration: doc.data().duration,
            subjectCode: doc.data().subjectCode,
            generateSession: doc.data().generateSession,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_SESSION_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const updateSession = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("sessions")
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
            type: UPDATE_SESSION_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_SESSION_FAILURE,
        error: err,
      });
    }
  };
};

export { addSession, viewSession, updateSession };
