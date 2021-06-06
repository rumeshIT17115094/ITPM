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
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addParallelSession = (sessionData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_PARALLEL_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("parallelSessions")
        .add({
          ...sessionData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_PARALLEL_SESSION_SUCCESS,
            payload: {
              ...sessionData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_PARALLEL_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewParallelSession = () => {
  return async (dispatch) => {
    dispatch({ type: GET_PARALLEL_SESSION_REQUEST });
    try {
      db.collection("parallelSessions")
        .orderBy("timestamp", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            startTime: doc.data().startTime,
            duration: doc.data().duration,
            date: doc.data().date,
            session: doc.data().session,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_PARALLEL_SESSION_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_PARALLEL_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const updateParallelSession = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_PARALLEL_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("parallelSessions")
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
            type: UPDATE_PARALLEL_SESSION_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_PARALLEL_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_PARALLEL_SESSION_FAILURE,
        error: err,
      });
    }
  };
};

export { addParallelSession, viewParallelSession, updateParallelSession };
