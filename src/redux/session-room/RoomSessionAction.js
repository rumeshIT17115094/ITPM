import {
  ADD_ROOM_SESSION_FAILURE,
  ADD_ROOM_SESSION_REQUEST,
  ADD_ROOM_SESSION_SUCCESS,
  GET_ROOM_SESSION_FAILURE,
  GET_ROOM_SESSION_REQUEST,
  GET_ROOM_SESSION_SUCCESS,
  UPDATE_ROOM_SESSION_FAILURE,
  UPDATE_ROOM_SESSION_REQUEST,
  UPDATE_ROOM_SESSION_SUCCESS,
} from "redux/session-room/RoomSessionType";
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addRoomSession = (sessionData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ROOM_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("roomSessions")
        .add({
          ...sessionData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_ROOM_SESSION_SUCCESS,
            payload: {
              ...sessionData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_ROOM_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewRoomSession = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ROOM_SESSION_REQUEST });
    try {
      db.collection("roomSessions")
        .orderBy("timestamp", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            room: doc.data().room,
            session: doc.data().session,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_ROOM_SESSION_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_ROOM_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const updateRoomSession = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ROOM_SESSION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("roomSessions")
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
            type: UPDATE_ROOM_SESSION_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_ROOM_SESSION_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_ROOM_SESSION_FAILURE,
        error: err,
      });
    }
  };
};

export { addRoomSession, viewRoomSession, updateRoomSession };
