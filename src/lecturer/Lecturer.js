import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./lecturer.css";
import {
  UpdateLecturerDetails,
  addLecturer,
  viewLecturer,
} from "redux/lecturer/LecturerAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
const Lecturer = () => {
  const dispatch = useDispatch();
  const { lecturer } = useSelector((state) => state.get_lecturersReducer);
  const [lecturerDetails, setLecturerDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [docId, setdocId] = useState(null);
  const formik = useFormik({
    initialValues: {
      emp_id: "",
      name: "",
      faculty: "",
      department: "",
      center: "",
      building: "",
      level: "",
      rank: "",
    },
    validationSchema: yup.object({
      emp_id: yup.string().required("emp_id is  required"),
      name: yup.string().required("name is required"),
      faculty: yup.string().required("faculty is required"),
      department: yup.string().required("department required"),
      center: yup.string().required("center required"),
      building: yup.string().required("building required"),
      level: yup.string().required("level required"),
      rank: yup.string().required("rank required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isAdd) {
        dispatch(addLecturer(values));
      } else {
        dispatch(UpdateLecturerDetails({ ...values, docId }));
      }
      setIsAdd(true);
      resetForm();
      setdocId(null);
    },
  });

  useEffect(() => {
    dispatch(viewLecturer());
  }, []);

  const clearField = () => {
    formik.resetForm();
  };

  useEffect(() => {
    console.log("lecturer", lecturer);
    setLecturerDetails(lecturer);
  }, [lecturerDetails, lecturer]);

  const handleDelete = (docId) => {
    db.collection("lecturers").doc(docId).delete();
  };
  const handleEdit = (data) => {
    setdocId(data.id);
    formik.setFieldValue("emp_id", data.emp_id);
    formik.setFieldValue("name", data.name);
    formik.setFieldValue("department", data.department);
    formik.setFieldValue("center", data.center);
    formik.setFieldValue("building", data.building);
    formik.setFieldValue("level", data.level);
    formik.setFieldValue("rank", data.rank);
    formik.setFieldValue("faculty", data.faculty);
    setIsAdd(false);
  };

  const handleDefault = () => {
    formik.resetForm();
    setdocId(null);
    setIsAdd(true);
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Lecturer</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 m-2">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>employee Id</th>
                  <th>faculty</th>
                  <th>Department</th>
                  <th>Center</th>
                  <th>Building</th>
                  <th>level</th>
                  <th>rank</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {lecturerDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.name}</td>
                    <td>{res?.emp_id}</td>
                    <td>{res?.faculty}</td>
                    <td>{res?.department}</td>
                    <td>{res?.center}</td>
                    <td>{res?.building}</td>
                    <td>{res?.level}</td>
                    <td>{res?.rank}</td>
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
          <div className="col-md-12 m-2">
            <form
              id="frm"
              className="frm-lecturer"
              onSubmit={formik.handleSubmit}
            >
              <div className="lecturer">
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="name">Lecturer Name</label>
                    <input
                      type="text"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="name"
                      value={formik.values.name}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.name && formik.touched.name ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.name}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="center">Center</label>
                    <select
                      className="form-select "
                      onChange={formik.handleChange}
                      name="center"
                      value={formik.values.center}
                    >
                      <option value="">select one</option>
                      <option value="Malabe">Malabe</option>
                      <option value="Metro">Metro</option>
                      <option value="Kandy">Kandy</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.center && formik.touched.center ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.center}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="lecturer">
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="emp_id">Employee Id</label>
                    <input
                      type="text"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="emp_id"
                      value={formik.values.emp_id}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.emp_id && formik.touched.emp_id ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.emp_id}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="building">Building</label>
                    <select
                      className="form-select "
                      onChange={formik.handleChange}
                      name="building"
                      value={formik.values.building}
                    >
                      <option value="">select one</option>
                      <option value="Architecture block">
                        Architecture block
                      </option>
                      <option value="Engineering block">
                        Engineering block
                      </option>
                      <option value="QS block">QS block</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.building && formik.touched.building ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.building}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="lecturer">
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="department">Department</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="department"
                      value={formik.values.department}
                    >
                      <option value="">select one</option>
                      <option value="Architecture">Architecture</option>
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
                      <option value="Electronic & Telecommunication Engineering">
                        Electronic & Telecommunication Engineering
                      </option>
                      <option value="Quantity Surverying">
                        Quantity Surverying
                      </option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.department && formik.touched.department ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.department}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="level">Rank</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="rank"
                      value={formik.values.rank}
                    >
                      <option value="">select one</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.rank && formik.touched.rank ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.rank}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="lecturer">
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="faculty">Faculty</label>
                    <select
                      className="form-select "
                      onChange={formik.handleChange}
                      name="faculty"
                      value={formik.values.faculty}
                    >
                      <option value="">select one</option>
                      <option value="Computing">Computing</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Business">Business</option>
                      <option value="Humanity science">Humanity science</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.faculty && formik.touched.faculty ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.faculty}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="level">Level</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="level"
                      value={formik.values.level}
                    >
                      <option value="">select one</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.level && formik.touched.level ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.level}{" "}
                      </h6>
                    ) : null}
                  </div>
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

export default Lecturer;
