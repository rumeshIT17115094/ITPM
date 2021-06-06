import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./ParallelSession.css";
import {
  addParallelSession,
  viewParallelSession,
} from "redux/parallel/ParallelAction";
import { viewSession } from "redux/sessions/SessionAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
import SessionNav from "session-nav/SessionNav";
const ParallelSession = () => {
  const dispatch = useDispatch();
  const { ParallelSessions } = useSelector(
    (state) => state.getParallelSessionsReducer
  );
  const { sessions } = useSelector((state) => state.getSessionsReducer);
  const [sessionDetails, setSessionDetails] = useState([]);
  const [parallelSessionDetails, setParallelSessionDetails] = useState([]);

  const formik = useFormik({
    initialValues: {
      startTime: "",
      duration: "",
      date: "",
      session: [],
    },
    validationSchema: yup.object({
      startTime: yup.string().required("startTime is required"),
      duration: yup.string().required("duration is required"),
      date: yup.date().required("date is required"),
      session: yup.array().min(1).required("session is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addParallelSession(values));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(viewSession());
    dispatch(viewParallelSession());
  }, []);

  useEffect(() => {
    setParallelSessionDetails(ParallelSessions);
  }, [ParallelSessions]);

  useEffect(() => {
    setSessionDetails(sessions);
  }, [sessions]);

  const handleDelete = (docId) => {
    db.collection("parallelSessions").doc(docId).delete();
  };

  const clearField = () => {
    formik.resetForm();
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Parallel Sessions</h4>
      <SessionNav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mt-4">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>Duration</th>
                  <th>Date</th>
                  <th>Session</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {parallelSessionDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.startTime}</td>
                    <td>{res?.duration}</td>
                    <td>{res?.date}</td>
                    <td>{res?.session?.join(",")}</td>
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
              <div className="parallel__count">
                <label htmlFor="tag">Start Time</label>
                <input
                  type="time"
                  className="form-control "
                  onChange={formik.handleChange}
                  name="startTime"
                  value={formik.values.startTime}
                />
              </div>
              <div className="error_div">
                {formik.errors.startTime && formik.touched.startTime ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.startTime}
                  </h6>
                ) : null}
              </div>
              <div className="parallel__count">
                <label htmlFor="duration">Duration</label>
                <input
                  type="number"
                  className="form-control num-control"
                  onChange={formik.handleChange}
                  name="duration"
                  value={formik.values.duration}
                />
              </div>
              <div className="error_div">
                {formik.errors.duration && formik.touched.duration ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.duration}
                  </h6>
                ) : null}
              </div>
              <div className="parallel__count">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control "
                  onChange={formik.handleChange}
                  name="date"
                  value={formik.values.date}
                />
              </div>
              <div className="error_div">
                {formik.errors.date && formik.touched.date ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.date}
                  </h6>
                ) : null}
              </div>
              <div className="parallel__count">
                <label htmlFor="session">session</label>
                <select
                  multiple
                  className="form-select select__list"
                  onChange={formik.handleChange}
                  name="session"
                  value={formik.values.session}
                >
                  {sessionDetails.map(({ generateSession, id }) => (
                    <option key={id}>{generateSession}</option>
                  ))}
                </select>
              </div>
              <div className="error_div">
                {formik.errors.session && formik.touched.session ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.session}
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

export default ParallelSession;
