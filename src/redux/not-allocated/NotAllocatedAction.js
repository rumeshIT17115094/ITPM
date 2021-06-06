import {
  ADD_NOT_ALLOCATED_FAILURE,
  ADD_NOT_ALLOCATED_REQUEST,
  ADD_NOT_ALLOCATED_SUCCESS,
  GET_NOT_ALLOCATED_FAILURE,
  GET_NOT_ALLOCATED_REQUEST,
  GET_NOT_ALLOCATED_SUCCESS,
  UPDATE_NOT_ALLOCATED_FAILURE,
  UPDATE_NOT_ALLOCATED_REQUEST,
  UPDATE_NOT_ALLOCATED_SUCCESS,
} from "redux/not-allocated/NotAllocatedType";
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addNotAllocatedTime = (allocatedData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_NOT_ALLOCATED_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("notAllocates")
        .add({
          ...allocatedData,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_NOT_ALLOCATED_SUCCESS,
            payload: {
              ...allocatedData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_NOT_ALLOCATED_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewNotAllocatedTime = () => {
  return async (dispatch) => {
    dispatch({ type: GET_NOT_ALLOCATED_REQUEST });
    try {
      db.collection("notAllocates")
        .orderBy("timestamp", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            lecturer: doc.data().lecturer,
            group: doc.data().group,
            subGroup: doc.data().subGroup,
            session: doc.data().session,
            sessionId: doc.data().sessionId,
            time: doc.data().time,
            etime: doc.data().etime,
            day: doc.data().day,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          //   console.log("getTemp Data", tempData);
          dispatch({
            type: GET_NOT_ALLOCATED_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_NOT_ALLOCATED_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateNotAllocatedTime = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_NOT_ALLOCATED_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("notAllocates")
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
            type: UPDATE_NOT_ALLOCATED_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_NOT_ALLOCATED_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_NOT_ALLOCATED_FAILURE,
        error: err,
      });
    }
  };
};

export { addNotAllocatedTime, viewNotAllocatedTime, UpdateNotAllocatedTime };
