import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./workingDays.css";
import {
  addWorkingdays,
  viewWorkingdays,
  UpdateWorkingdaysDetails,
} from "redux/workingDays/WorkingDaysAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
const WorkingDays = () => {
  const dispatch = useDispatch();
  const { workingdays } = useSelector((state) => state.get_workingdaysReducer);
  const [workingDaysDetails, setWorkingDaysDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [docId, setdocId] = useState(null);
  const formik = useFormik({
    initialValues: {
      noOfWorkingDays: "",
      WorkingDays: [],
      hours: "",
      minutes: "",
    },
    validationSchema: yup.object({
      noOfWorkingDays: yup.number().required("working days count required"),
      WorkingDays: yup.array().min(1).required("working days required"),
      hours: yup.number().required("Number of hours required"),
      minutes: yup.number().required("minutes required"),
    }),
    onSubmit: (values, { resetForm }) => {
      //   console.log("values", values);
      if (isAdd) {
        dispatch(addWorkingdays(values));
      } else {
        dispatch(UpdateWorkingdaysDetails({ ...values, docId }));
      }
      setIsAdd(true);
      resetForm();
      setdocId(null);
    },
  });

  useEffect(() => {
    dispatch(viewWorkingdays());
  }, []);

  useEffect(() => {
    setWorkingDaysDetails(workingdays);
  }, [workingDaysDetails, workingdays]);

  const handleDelete = (docId) => {
    db.collection("workingdays").doc(docId).delete();
  };
  const handleEdit = (data) => {
    // console.log("data", data);
    setdocId(data.id);
    formik.setFieldValue("noOfWorkingDays", data.noOfWorkingDays);
    formik.setFieldValue("WorkingDays", data.WorkingDays);
    formik.setFieldValue("hours", data.hours);
    formik.setFieldValue("minutes", data.minutes);
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
      <h4 className="text-center text-info">Working Days and Hours</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>working days count</th>
                  <th>working days</th>
                  <th>hours</th>
                  <th>minutes</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {workingDaysDetails.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.noOfWorkingDays}</td>
                    <td>{res?.WorkingDays.join(",")}</td>
                    <td>{res?.hours}</td>
                    <td>{res?.minutes}</td>
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
            <form id="frm" className="wrk" onSubmit={formik.handleSubmit}>
              <div className="workingDays__count">
                <label htmlFor="noOfWorkingDays">No of Working Days</label>
                <input
                  type="number"
                  className="form-control "
                  onChange={formik.handleChange}
                  name="noOfWorkingDays"
                  value={formik.values.noOfWorkingDays}
                />
              </div>
              <div className="error_div">
                {formik.errors.noOfWorkingDays &&
                formik.touched.noOfWorkingDays ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.noOfWorkingDays}{" "}
                  </h6>
                ) : null}
              </div>
              <div className="workingDays__count">
                <label htmlFor="WorkingDays">Working Days</label>
                <select
                  multiple
                  className="form-select"
                  onChange={formik.handleChange}
                  name="WorkingDays"
                  value={formik.values.WorkingDays}
                >
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
                {formik.errors.WorkingDays && formik.touched.WorkingDays ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.WorkingDays}{" "}
                  </h6>
                ) : null}
              </div>
              <div className="workingDays__count">
                <label htmlFor="WorkingDays">Working Days</label>
                <div className="workingDays__countSecondary">
                  <label htmlFor="hours">hours</label>
                  <input
                    required
                    type="number"
                    className="form-control min-input"
                    onChange={formik.handleChange}
                    name="hours"
                    value={formik.values.hours}
                  />
                </div>
                <div className="workingDays__countSecondary">
                  <label htmlFor="hours">minutes</label>
                  <input
                    required
                    type="number"
                    className="form-control min-input"
                    onChange={formik.handleChange}
                    name="minutes"
                    value={formik.values.minutes}
                  />
                </div>
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

export default WorkingDays;
