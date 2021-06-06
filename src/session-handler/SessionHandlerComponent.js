import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./SessionHandlerComponent.css";
import {
  addSessionHandler,
  viewSessionHandler,
} from "redux/session-handler/SessionHandlerAction";
import { viewSession } from "redux/sessions/SessionAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";

const SessionHandlerComponent = () => {
  const dispatch = useDispatch();
  const { sessionHandlers } = useSelector(
    (state) => state.getSessionHandlerReducer
  );
  const { sessions } = useSelector((state) => state.getSessionsReducer);
  const [sessionHandlerDetails, setSessionHandlerDetails] = useState([]);
  const [sessionDetails, setSessionDetails] = useState([]);

  const formik = useFormik({
    initialValues: {
      room: "",
      day: "",
      time: "",
      etime: "",
      session: "",
    },
    validationSchema: yup.object({
      room: yup.string().required("Room name required"),
      day: yup.string().required("Day name required"),
      time: yup.string().required("Start Time  required"),
      etime: yup.string().required("End Time  required"),
      session: yup.string().required("session is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addSessionHandler(values));
      resetForm();
    },
  });

  useEffect(() => {
    setSessionDetails(sessions);
  }, [sessions]);
  useEffect(() => {
    dispatch(viewSessionHandler());
    dispatch(viewSession());
  }, []);

  useEffect(() => {
    setSessionHandlerDetails(sessionHandlers);
  }, [sessionHandlers]);

  const handleDelete = (docId) => {
    db.collection("sessionHandlers").doc(docId).delete();
  };

  const clearField = () => {
    formik.resetForm();
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Session Management</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Room Name</th>
                  <th>Day</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Session</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sessionHandlerDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.room}</td>
                    <td>{res?.day}</td>
                    <td>{res?.time}</td>
                    <td>{res?.etime}</td>
                    <td>{res?.session}</td>
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
          <div className="col-md-12 m-2">
            <form
              id="frm"
              className="frm-notAllocated"
              onSubmit={formik.handleSubmit}
            >
              <div className="notAllocated">
                <div className="notAllocated_sub">
                  <div className="notAllocated__count">
                    <label htmlFor="room">Select Room</label>
                    <select
                      className="form-select "
                      onChange={formik.handleChange}
                      name="room"
                      value={formik.values.room}
                    >
                      <option value="">select one</option>
                      <option value="A502">A502</option>
                      <option value="A501">A501</option>
                      <option value="B402">B402</option>
                      <option value="A411">A411</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.room && formik.touched.room ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.room}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="notAllocated_sub">
                  <div className="notAllocated__count">
                    <label htmlFor="time">Start Time</label>
                    <input
                      type="time"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="time"
                      value={formik.values.time}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.time && formik.touched.time ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.time}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="notAllocated">
                <div className="notAllocated_sub">
                  <div className="notAllocated__count">
                    <label htmlFor="session">Session</label>
                    <select
                      className="form-select form-length"
                      onChange={formik.handleChange}
                      name="session"
                      value={formik.values.session}
                    >
                      <option value="">select one</option>
                      {sessions.map((res) => (
                        <option value={res.generateSession} key={res.id}>
                          {res.generateSession}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.session && formik.touched.session ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.session}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="notAllocated_sub">
                  <div className="notAllocated__count">
                    <label htmlFor="day">End time</label>

                    <input
                      type="time"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="etime"
                      value={formik.values.etime}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.etime && formik.touched.etime ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.etime}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="notAllocated">
                <div className="notAllocated_sub">
                  <div className="notAllocated__count">
                    <label htmlFor="day">Day</label>
                    <select
                      className="form-select form-length"
                      onChange={formik.handleChange}
                      name="day"
                      value={formik.values.day}
                    >
                      <option value="">select one</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">TuesDay</option>
                      <option value="Wednesday">WednesDay</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.day && formik.touched.day ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.day}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="btn-div">
                <button type="submit" className={"btn btn-info"}>
                  Submit
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

export default SessionHandlerComponent;
