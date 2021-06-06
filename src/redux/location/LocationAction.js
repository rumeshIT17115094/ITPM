import {
  ADD_LOCATION_FAILURE,
  ADD_LOCATION_REQUEST,
  ADD_LOCATION_SUCCESS,
  GET_LOCATION_FAILURE,
  GET_LOCATION_REQUEST,
  GET_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
  UPDATE_LOCATION_REQUEST,
  UPDATE_LOCATION_SUCCESS,
} from "redux/location/LocationType";
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addLocation = (locationData) => {
  return async (dispatch) => {
    dispatch({ type: ADD_LOCATION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      db.collection("locations")
        .add({
          ...locationData,
        })
        .then(() => {
          dispatch({
            type: ADD_LOCATION_SUCCESS,
            payload: {
              ...locationData,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_LOCATION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewLocation = () => {
  return async (dispatch) => {
    dispatch({ type: GET_LOCATION_REQUEST });
    try {
      db.collection("locations")
        .orderBy("building_name", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            building_name: doc.data().building_name,
            room_name: doc.data().room_name,
            capacity: doc.data().capacity,
            roomType: doc.data().roomType,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          console.log("getTemp Data", tempData);
          dispatch({
            type: GET_LOCATION_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_LOCATION_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateLocation = (values) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_LOCATION_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("locations")
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
            type: UPDATE_LOCATION_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_LOCATION_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_LOCATION_FAILURE,
        error: err,
      });
    }
  };
};

export { UpdateLocation, addLocation, viewLocation };
