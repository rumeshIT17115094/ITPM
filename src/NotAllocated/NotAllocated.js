import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./NotAllocated.css";
import {
  addNotAllocatedTime,
  viewNotAllocatedTime,
} from "redux/not-allocated/NotAllocatedAction";
import { viewStudents } from "redux/student/StudentAction";
import { viewSession } from "redux/sessions/SessionAction";
import { viewLecturer } from "redux/lecturer/LecturerAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
import SessionNav from "session-nav/SessionNav";
const NotAllocated = () => {
  const dispatch = useDispatch();
  const { lecturer } = useSelector((state) => state.get_lecturersReducer);
  const { sessions } = useSelector((state) => state.getSessionsReducer);
  const { students } = useSelector((state) => state.getStudentsReducer);
  const { notAllocates } = useSelector((state) => state.getNotAllocateReducer);
  const [lecturerDetails, setLecturerDetails] = useState([]);
  const [sessionDetails, setSessionDetails] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [notAllocatedDetails, setNotAllocatedDetails] = useState([]);

  const formik = useFormik({
    initialValues: {
      lecturer: "",
      group: "",
      subGroup: "",
      session: "",
      time: "",
      etime: "",
      day: "",
    },
    validationSchema: yup.object({
      lecturer: yup.string().required("lecturer is  required"),
      group: yup.string().required("group is required"),
      subGroup: yup.string().required("subGroup required"),
      session: yup.string().required("session required"),
      time: yup.string().required("start time required"),
      etime: yup.string().required("End time is required"),
      day: yup.string().required("day is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const sessionId = sessionDetails.find(
        (res) => res.name === values.session.name
      ).id;
      dispatch(addNotAllocatedTime({ ...values, sessionId }));

      resetForm();
    },
  });

  useEffect(() => {
    dispatch(viewNotAllocatedTime());
    dispatch(viewLecturer());
    dispatch(viewSession());
    dispatch(viewStudents());
  }, []);

  const clearField = () => {
    formik.resetForm();
  };
  useEffect(() => {
    setNotAllocatedDetails(notAllocates);
  }, [notAllocates]);
  useEffect(() => {
    setSessionDetails(sessions);
  }, [sessions]);
  useEffect(() => {
    setStudentDetails(students);
  }, [students]);

  useEffect(() => {
    setLecturerDetails(lecturer);
  }, [lecturer]);

  const handleDelete = (docId) => {
    db.collection("notAllocates").doc(docId).delete();
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">
        Sessions and Not Allocated Times Allocation
      </h4>
      <SessionNav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 m-2">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>lecturer</th>
                  <th>group</th>
                  <th>subGroup</th>
                  <th>session</th>
                  <th>Start time</th>
                  <th>End time</th>
                  <th>Day</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {notAllocatedDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.lecturer}</td>
                    <td>{res?.group}</td>
                    <td>{res?.subGroup}</td>
                    <td>{res?.session}</td>
                    <td>{res?.time}</td>
                    <td>{res?.etime}</td>
                    <td>{res?.day}</td>
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
                    <label htmlFor="notAllocated">Lecturer</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="lecturer"
                      value={formik.values.lecturer}
                    >
                      <option value="">select one</option>
                      {lecturerDetails.map((res) => (
                        <option value={res.name} key={res.id}>
                          {res.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.lecturer && formik.touched.lecturer ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.lecturer}{" "}
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
                    <label htmlFor="group">Select Group</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="group"
                      value={formik.values.group}
                    >
                      <option value="">select one</option>
                      {studentDetails.map((res) => (
                        <option value={res.groupId} key={res.id}>
                          {res.groupId}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.group && formik.touched.group ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.group}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="notAllocated_sub">
                  <div className="notAllocated__count">
                    <label htmlFor="etime">End Time</label>
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
                    <label htmlFor="subGroup">Select Sub Group</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="subGroup"
                      value={formik.values.subGroup}
                    >
                      <option value="">select one</option>
                      {studentDetails.map((res) => (
                        <option value={res.subGroupId}>{res.subGroupId}</option>
                      ))}
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.subGroup && formik.touched.subGroup ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.subGroup}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
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
              <div className="notAllocated">
                <div className="notAllocated_sub">
                  <div className="notAllocated__count">
                    <label htmlFor="session">Select Session Id</label>
                    <select
                      className="form-select "
                      onChange={formik.handleChange}
                      name="session"
                      value={formik.values.session}
                    >
                      <option value="">select one</option>
                      {sessionDetails.map((res) => (
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
                  <button
                    className="btn btn-warning ms-1"
                    type="button"
                    onClick={clearField}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="btn-div">
                <button type="submit" className={"btn btn-info"}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAllocated;
