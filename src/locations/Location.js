import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./location.css";
import {
  addLocation,
  UpdateLocation,
  viewLocation,
} from "redux/location/LocationAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
const Location = () => {
  const dispatch = useDispatch();
  const { loactions } = useSelector((state) => state.getLocationsReducer);
  const [locationDetails, setLocationDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [docId, setdocId] = useState(null);
  const formik = useFormik({
    initialValues: {
      building_name: "",
      room_name: "",
      capacity: "",
      roomType: "",
    },
    validationSchema: yup.object({
      building_name: yup.string().required("Building name required"),
      room_name: yup.string().required("Room name required"),
      capacity: yup.number().required("capacity  required"),
      roomType: yup.string().required("roomType  required"),
    }),
    onSubmit: (values, { resetForm }) => {
      //   console.log("values", values);
      if (isAdd) {
        dispatch(addLocation(values));
      } else {
        dispatch(UpdateLocation({ ...values, docId }));
      }
      setIsAdd(true);
      resetForm();
      setdocId(null);
    },
  });

  useEffect(() => {
    dispatch(viewLocation());
  }, []);

  useEffect(() => {
    setLocationDetails(loactions);
  }, [loactions]);

  const handleDelete = (docId) => {
    db.collection("locations").doc(docId).delete();
  };
  const handleEdit = (data) => {
    // console.log("data", data);

    setdocId(data.id);
    formik.setFieldValue("building_name", data.building_name);
    formik.setFieldValue("room_name", data.room_name);
    formik.setFieldValue("capacity", data.capacity);
    formik.setFieldValue("roomType", data.roomType);
    setIsAdd(false);
  };

  const clearField = () => {
    formik.resetForm();
  };
  const handleDefault = () => {
    formik.resetForm();

    setdocId(null);
    setIsAdd(true);
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Locations</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Building name</th>
                  <th>Room name</th>
                  <th>Capacity</th>
                  <th>Room Type</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {locationDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.building_name}</td>
                    <td>{res?.room_name}</td>
                    <td>{res?.capacity}</td>
                    <td>{res?.roomType}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          handleDelete(res.id);
                        }}
                        disabled={docId === res.id}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => {
                          handleEdit(res);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-12">
            <form id="frm" className="wrk-loc" onSubmit={formik.handleSubmit}>
              <div className="workingDays__count">
                <label htmlFor="building_name">Building Name</label>
                <input
                  type="text"
                  className="form-control "
                  onChange={formik.handleChange}
                  name="building_name"
                  value={formik.values.building_name}
                />
              </div>
              <div className="error_div">
                {formik.errors.building_name && formik.touched.building_name ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.building_name}{" "}
                  </h6>
                ) : null}
              </div>
              <div className="workingDays__count">
                <label htmlFor="room_name">Room Name</label>
                <input
                  type="text"
                  className="form-control "
                  onChange={formik.handleChange}
                  name="room_name"
                  value={formik.values.room_name}
                />
              </div>
              <div className="error_div">
                {formik.errors.room_name && formik.touched.room_name ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.room_name}{" "}
                  </h6>
                ) : null}
              </div>

              <div className="workingDays__count">
                <label htmlFor="roomType">Room Type</label>
                <div className="location_subInner">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={formik.handleChange}
                      name="roomType"
                      value={"Lecture Hall"}
                      id="flexRadioDefault2"
                      checked={formik.values.roomType === "Lecture Hall"}
                    />
                    <label className="form-check-label" htmlFor="sub_off_semi">
                      Lecture Hall
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      onChange={formik.handleChange}
                      name="roomType"
                      value={"Laboratory"}
                      id="flexRadioDefault2"
                      checked={formik?.values?.roomType === "Laboratory"}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      Laboratory
                    </label>
                  </div>
                </div>
              </div>
              <div className="error_div">
                {formik.errors.roomType && formik.touched.roomType ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.roomType}{" "}
                  </h6>
                ) : null}
              </div>
              <div className="workingDays__count">
                <label htmlFor="capacity">Capacity</label>

                <input
                  type="text"
                  className="form-control "
                  onChange={formik.handleChange}
                  name="capacity"
                  value={formik.values.capacity}
                />
              </div>
              <div className="error_div">
                {formik.errors.capacity && formik.touched.capacity ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.capacity}{" "}
                  </h6>
                ) : null}
              </div>
              <div className="btn-div">
                <button
                  type="submit"
                  className={
                    isAdd ? "btn btn-info btn-add" : "btn btn-success btn-add"
                  }
                >
                  {isAdd ? "Add detail" : "Update detail"}
                </button>
                {!isAdd && (
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={handleDefault}
                  >
                    cancel
                  </button>
                )}
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

export default Location;
