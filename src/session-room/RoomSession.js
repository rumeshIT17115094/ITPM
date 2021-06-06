import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./RoomSession.css";
import { viewSession } from "redux/sessions/SessionAction";
import {
  addRoomSession,
  viewRoomSession,
} from "redux/session-room/RoomSessionAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
import SessionNav from "session-nav/SessionNav";
const RoomSession = () => {
  const dispatch = useDispatch();
  const { sessions } = useSelector((state) => state.getSessionsReducer);
  const { RoomSessions } = useSelector((state) => state.getRoomSessionsReducer);
  const [roomDetails, setRoomDetails] = useState([]);
  const [sessionDetails, setSessionDetails] = useState([]);

  const formik = useFormik({
    initialValues: {
      session: "",
      room: "",
    },
    validationSchema: yup.object({
      session: yup.string().required("session is  required"),
      room: yup.string().required("room is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addRoomSession(values));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(viewSession());
    dispatch(viewRoomSession());
  }, []);

  useEffect(() => {
    setSessionDetails(sessions);
  }, [sessions]);
  const clearField = () => {
    formik.resetForm();
  };

  useEffect(() => {
    // console.log("lecturer", lecturer);
    setRoomDetails(RoomSessions);
  }, [RoomSessions]);

  const handleDelete = (docId) => {
    db.collection("roomSessions").doc(docId).delete();
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Manage Session Rooms</h4>
      <SessionNav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 m-2">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Lecturer</th>
                  <th>Subject </th>
                  <th>Subject Name</th>
                  <th>Group Id</th>
                  <th>Tag</th>
                  <th>no of students</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roomDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.session.split("-")[0]}</td>
                    <td>{res?.session.split("-")[1]}</td>
                    <td>{res?.session.split("-")[2]}</td>
                    <td>{res?.session.split("-")[3]}</td>
                    <td>{res?.session.split("-")[4]}</td>
                    <td>{res?.session.split("-")[5]}</td>

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
              className="frm-lecturer"
              onSubmit={formik.handleSubmit}
            >
              <div className="lecturer">
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="session">Select session</label>
                    <select
                      className="form-select select__list"
                      onChange={formik.handleChange}
                      name="session"
                      value={formik.values.session}
                    >
                      <option value="">select one</option>
                      {sessionDetails.map(({ generateSession, id }) => (
                        <option key={id}>{generateSession}</option>
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
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="room">select Room</label>
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
              </div>

              <div className="btn-div">
                <button type="submit" className={"btn btn-info btn-add"}>
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

export default RoomSession;
