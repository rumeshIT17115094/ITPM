import {
  ADD_WORKINGDAYS_REQUEST,
  ADD_WORKINGDAYS_SUCCESS,
  ADD_WORKINGDAYS_FAILURE,
  GET_WORKINGDAYS_REQUEST,
  GET_WORKINGDAYS_SUCCESS,
  GET_WORKINGDAYS_FAILURE,
  UPDATE_WORKINGDAYS_FAILURE,
  UPDATE_WORKINGDAYS_REQUEST,
  UPDATE_WORKINGDAYS_SUCCESS,
} from "redux/workingDays/WorkingDaysType";
import firebase from "firebase";
import { db } from "firebase/FirebaseNew";

const addWorkingdays = ({ noOfWorkingDays, WorkingDays, minutes, hours }) => {
  return async (dispatch) => {
    dispatch({ type: ADD_WORKINGDAYS_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("workingdays")
        .add({
          noOfWorkingDays,
          WorkingDays,
          minutes,
          hours,
          timestamp,
        })
        .then(() => {
          dispatch({
            type: ADD_WORKINGDAYS_SUCCESS,
            payload: {
              // emp_id: lecturer_emp_id,
              noOfWorkingDays,
              WorkingDays,
              minutes,
              hours,
              timestamp,
            },
          });
        })
        .catch((err) => {
          dispatch({
            type: ADD_WORKINGDAYS_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const viewWorkingdays = () => {
  return async (dispatch) => {
    dispatch({ type: GET_WORKINGDAYS_REQUEST });
    try {
      db.collection("workingdays")
        // .orderBy("name", "asc")
        .onSnapshot(async (snapshot) => {
          const tempData = await snapshot.docs.map((doc) => ({
            noOfWorkingDays: doc.data().noOfWorkingDays,
            WorkingDays: doc.data().WorkingDays,
            minutes: doc.data().minutes,
            hours: doc.data().hours,
            id: doc.id,
            timestamp: doc.data().timestamp,
          }));
          // console.log("getTemp Data", tempData);
          dispatch({
            type: GET_WORKINGDAYS_SUCCESS,
            payload: tempData,
          });
        })
        .catch((err) => {
          dispatch({
            type: GET_WORKINGDAYS_FAILURE,
            error: err,
          });
        });
    } catch (err) {}
  };
};

const UpdateWorkingdaysDetails = ({
  docId,
  noOfWorkingDays,
  WorkingDays,
  minutes,
  hours,
}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_WORKINGDAYS_REQUEST });
    try {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection("workingdays")
        .doc(docId)
        .set(
          {
            noOfWorkingDays,
            WorkingDays,
            minutes,
            hours,
            timestamp,
          },
          { merge: true }
        )
        .then(() => {
          dispatch({
            type: UPDATE_WORKINGDAYS_SUCCESS,
            message: "upload Sucessfully",
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_WORKINGDAYS_FAILURE,
            error: err,
          });
        });
    } catch (err) {
      dispatch({
        type: UPDATE_WORKINGDAYS_FAILURE,
        error: err,
      });
    }
  };
};

export { addWorkingdays, viewWorkingdays, UpdateWorkingdaysDetails };
