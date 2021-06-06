import {
  ADD_SESSION_HANDLER_FAILURE,
  ADD_SESSION_HANDLER_REQUEST,
  ADD_SESSION_HANDLER_SUCCESS,
  GET_SESSION_HANDLER_FAILURE,
  GET_SESSION_HANDLER_REQUEST,
  GET_SESSION_HANDLER_SUCCESS,
  UPDATE_SESSION_HANDLER_FAILURE,
  UPDATE_SESSION_HANDLER_REQUEST,
  UPDATE_SESSION_HANDLER_SUCCESS,
} from "redux/session-handler/SessionHandlerType";
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addSessionHandler = (allocatedData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_SESSION_HANDLER_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("sessionHandlers")
        .add({
          ...allocatedData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_SESSION_HANDLER_SUCCESS,
            payload: {
              ...allocatedData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_SESSION_HANDLER_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewSessionHandler = () => {
  return async (dispatch) => {
    dispatch({ type: GET_SESSION_HANDLER_REQUEST });
    try {
      db.collection("sessionHandlers")
        .orderBy("timestamp", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            session: doc.data().session,
            day: doc.data().day,
            time: doc.data().time,
            etime: doc.data().etime,
            room: doc.data().room,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));

          dispatch({
            type: GET_SESSION_HANDLER_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_SESSION_HANDLER_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateSessionHandler = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_SESSION_HANDLER_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("sessionHandlers")
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
            type: UPDATE_SESSION_HANDLER_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_SESSION_HANDLER_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_SESSION_HANDLER_FAILURE,
        error: err,
      });
    }
  };
};

export { addSessionHandler, viewSessionHandler, UpdateSessionHandler };
