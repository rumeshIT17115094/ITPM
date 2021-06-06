import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./Consecutive.css";
import {
  viewConsecutiveSession,
  addConsecutiveSession,
} from "redux/consecutive/ConsecutiveAction";
import { viewSession } from "redux/sessions/SessionAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
import SessionNav from "session-nav/SessionNav";
const Consecutive = () => {
  const dispatch = useDispatch();
  const { ConsecutiveSessions } = useSelector(
    (state) => state.getConsecutiveSessionsReducer
  );
  const { sessions } = useSelector((state) => state.getSessionsReducer);
  const [sessionDetails, setSessionDetails] = useState([]);
  const [consecutiveSessionDetails, setConsecutiveSessionDetails] = useState(
    []
  );

  const formik = useFormik({
    initialValues: {
      lectureSession: "",
      tutorialSession: "",
    },
    validationSchema: yup.object({
      lectureSession: yup.string().required("Session for session is required"),
      tutorialSession: yup
        .string()
        .required("Session for tutorial is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addConsecutiveSession(values));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(viewSession());
    dispatch(viewConsecutiveSession());
  }, []);

  useEffect(() => {
    setConsecutiveSessionDetails(ConsecutiveSessions);
  }, [ConsecutiveSessions]);

  useEffect(() => {
    setSessionDetails(sessions);
  }, [sessions]);

  const handleDelete = (docId) => {
    db.collection("consecutiveSessions").doc(docId).delete();
  };

  const clearField = () => {
    formik.resetForm();
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Consecutive Sessions</h4>
      <SessionNav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mt-4">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Lecture Session</th>
                  <th>Consecutive Session</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {consecutiveSessionDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.lecture}</td>
                    <td>{res?.tutorial}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          handleDelete(res.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-12">
            <form id="frm" className="tag-form" onSubmit={formik.handleSubmit}>
              <div className="consecutive__count">
                <label htmlFor="lectureSession">Lecture</label>
                <select
                  className="form-select select__list"
                  onChange={formik.handleChange}
                  name="lectureSession"
                  value={formik.values.lectureSession}
                >
                  <option value="">select one</option>
                  {sessionDetails.map(
                    ({ generateSession, id }) =>
                      ["Lecture"].includes(generateSession.split("-")[4]) && (
                        <option key={id}>{generateSession}</option>
                      )
                  )}
                </select>
              </div>
              <div className="error_div">
                {formik.errors.lectureSession &&
                formik.touched.lectureSession ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.lectureSession}
                  </h6>
                ) : null}
              </div>
              <div className="consecutive__count">
                <label htmlFor="tutorialSession">Tutorial</label>
                <select
                  className="form-select select__list"
                  onChange={formik.handleChange}
                  name="tutorialSession"
                  value={formik.values.tutorialSession}
                >
                  <option value="">select one</option>
                  {sessionDetails.map(
                    ({ generateSession, id }) =>
                      ["Tutorial"].includes(generateSession.split("-")[4]) && (
                        <option key={id}>{generateSession}</option>
                      )
                  )}
                </select>
              </div>
              <div className="error_div">
                {formik.errors.tutorialSession &&
                formik.touched.tutorialSession ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.tutorialSession}
                  </h6>
                ) : null}
              </div>
              <div className="btn-div">
                <button type="submit" className="btn btn-success btn-add">
                  Add Session
                </button>
                <button
                  className="btn btn-warning ms-1"
                  type="button"
                  onClick={clearField}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consecutive;
