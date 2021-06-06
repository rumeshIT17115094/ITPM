import {
  ADD_NOT_ALLOCATED_ROOM_FAILURE,
  ADD_NOT_ALLOCATED_ROOM_REQUEST,
  ADD_NOT_ALLOCATED_ROOM_SUCCESS,
  GET_NOT_ALLOCATED_ROOM_FAILURE,
  GET_NOT_ALLOCATED_ROOM_REQUEST,
  GET_NOT_ALLOCATED_ROOM_SUCCESS,
  UPDATE_NOT_ALLOCATED_ROOM_FAILURE,
  UPDATE_NOT_ALLOCATED_ROOM_REQUEST,
  UPDATE_NOT_ALLOCATED_ROOM_SUCCESS,
} from "redux/notAllocated-room/NotAllocatedRoomType";
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addNotAllocatedRoom = (allocatedData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NOT_ALLOCATED_ROOM_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("notAllocateRooms")
        .add({
          ...allocatedData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_NOT_ALLOCATED_ROOM_SUCCESS,
            payload: {
              ...allocatedData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_NOT_ALLOCATED_ROOM_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewNotAllocatedRoom = () => {
  return async (dispatch) => {
    dispatch({ type: GET_NOT_ALLOCATED_ROOM_REQUEST });
    try {
      db.collection("notAllocateRooms")
        .orderBy("timestamp", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            room: doc.data().room,
            day: doc.data().day,
            time: doc.data().time,
            etime: doc.data().etime,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          //   console.log("getTemp Data", tempData);
          dispatch({
            type: GET_NOT_ALLOCATED_ROOM_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_NOT_ALLOCATED_ROOM_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateNotAllocatedRoom = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_NOT_ALLOCATED_ROOM_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("notAllocateRooms")
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
            type: UPDATE_NOT_ALLOCATED_ROOM_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_NOT_ALLOCATED_ROOM_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_NOT_ALLOCATED_ROOM_FAILURE,
        error: err,
      });
    }
  };
};

export { addNotAllocatedRoom, viewNotAllocatedRoom, UpdateNotAllocatedRoom };
