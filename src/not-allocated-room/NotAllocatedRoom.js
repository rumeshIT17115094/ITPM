import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./NotAllocatedRoom.css";
import {
  addNotAllocatedRoom,
  viewNotAllocatedRoom,
} from "redux/notAllocated-room/NotAllocatedRoomAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
import SessionNav from "session-nav/SessionNav";
const NotAllocatedRoom = () => {
  const dispatch = useDispatch();
  const { notAllocateRooms } = useSelector(
    (state) => state.getNotAllocateRoomReducer
  );
  const [notAllocatedDetails, setNotAllocatedDetails] = useState([]);

  const formik = useFormik({
    initialValues: {
      room: "",
      day: "",
      time: "",
      etime: "",
    },
    validationSchema: yup.object({
      room: yup.string().required("Room name required"),
      day: yup.string().required("Day name required"),
      time: yup.string().required("Start Time  required"),
      etime: yup.string().required("End Time  required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(addNotAllocatedRoom(values));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(viewNotAllocatedRoom());
  }, []);

  useEffect(() => {
    setNotAllocatedDetails(notAllocateRooms);
  }, [notAllocateRooms]);

  const handleDelete = (docId) => {
    db.collection("notAllocateRooms").doc(docId).delete();
  };

  const clearField = () => {
    formik.resetForm();
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Not Allocated Rooms</h4>
      <SessionNav />
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {notAllocatedDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.room}</td>
                    <td>{res?.day}</td>
                    <td>{res?.time}</td>
                    <td>{res?.etime}</td>
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

export default NotAllocatedRoom;
