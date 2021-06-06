import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./subject.css";
import {
  UpdateSubjectDetails,
  addSubject,
  viewSubject,
} from "redux/subject/SubjectAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
const Subject = () => {
  const dispatch = useDispatch();
  const { subject } = useSelector((state) => state.get_SubjectsReducer);
  const { error } = useSelector((state) => state.SubjectReducer);
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [docId, setdocId] = useState(null);
  const formik = useFormik({
    initialValues: {
      sub_id: "",
      sub_name: "",
      sub_off_year: "",
      sub_off_semi: "",
      sub_lec_hrs: "",
      sub_tut_hrs: "",
      sub_lab_hrs: "",
      sub_eva_hrs: "",
    },
    validationSchema: yup.object({
      sub_id: yup.string().required("subject id is  required"),
      sub_name: yup.string().required("name is required"),
      sub_off_year: yup.string().required("offered year is required"),
      sub_off_semi: yup.string().required("offered semister required"),
      sub_lec_hrs: yup.number().required("lecture hrs required"),
      sub_tut_hrs: yup.number().required("tutorial hrs required"),
      sub_lab_hrs: yup.number().required("lab hrs required"),
      sub_eva_hrs: yup.number().required("evalution hrs required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isAdd) {
        dispatch(addSubject(values));
      } else {
        dispatch(UpdateSubjectDetails({ ...values, docId }));
      }
      setIsAdd(true);
      resetForm();
      setdocId(null);
    },
  });

  useEffect(() => {
    dispatch(viewSubject());
  }, []);

  useEffect(() => {
    setSubjectDetails(subject);
  }, [subject]);

  const handleDelete = (docId) => {
    db.collection("subjects").doc(docId).delete();
  };
  const clearField = () => {
    formik.resetForm();
  };
  const handleEdit = (data) => {
    setdocId(data.id);
    formik.setFieldValue("sub_id", data.sub_id);
    formik.setFieldValue("sub_name", data.sub_name);
    formik.setFieldValue("sub_off_year", data.sub_off_year);
    formik.setFieldValue("sub_off_semi", data.sub_off_semi);
    formik.setFieldValue("sub_lec_hrs", data.sub_lec_hrs);
    formik.setFieldValue("sub_tut_hrs", data.sub_tut_hrs);
    formik.setFieldValue("sub_lab_hrs", data.sub_lab_hrs);
    formik.setFieldValue("sub_eva_hrs", data.sub_eva_hrs);
    setIsAdd(false);
  };

  const handleDefault = () => {
    formik.resetForm();
    setdocId(null);
    setIsAdd(true);
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Subject</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 m-2">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Offered Year</th>
                  <th>Offered semi</th>
                  <th>Lecturer hours</th>
                  <th>Tutorial hours</th>
                  <th>Lap hours</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subjectDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.sub_name}</td>
                    <td>{res?.sub_off_year}</td>
                    <td>{res?.sub_off_semi}</td>
                    <td>{res?.sub_lec_hrs}</td>
                    <td>{res?.sub_tut_hrs}</td>
                    <td>{res?.sub_lab_hrs}</td>

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
              id="frm-subject"
              className="frm-subject"
              onSubmit={formik.handleSubmit}
            >
              <p className="text-danger text-center">{error !== "" && error}</p>
              <div className="subject">
                <div className="subject_sub">
                  <div className="subject__count">
                    <label htmlFor="sub_off_year">Offered year</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="sub_off_year"
                      value={formik.values.sub_off_year}
                    >
                      <option value="">select one</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.sub_off_year &&
                    formik.touched.sub_off_year ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.sub_off_year}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="subject_sub">
                  <div className="subject__count">
                    <label htmlFor="sub_lec_hrs">Number of lecture hours</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="sub_lec_hrs"
                      value={formik.values.sub_lec_hrs}
                    >
                      <option value="">select one</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.sub_lec_hrs && formik.touched.sub_lec_hrs ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.sub_lec_hrs}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="subject">
                <div className="subject_sub">
                  <div className="subject__count">
                    <label htmlFor="flexRadioDefault2">Offered Semester</label>
                    <div className="subject_subInner">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          onChange={formik.handleChange}
                          name="sub_off_semi"
                          value={1}
                          id="flexRadioDefault2"
                          checked={formik.values.sub_off_semi === "1"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="sub_off_semi"
                        >
                          1st semister
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          onChange={formik.handleChange}
                          name="sub_off_semi"
                          value={2}
                          id="flexRadioDefault2"
                          checked={formik?.values?.sub_off_semi === "2"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        >
                          2nd semister
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="error_div">
                    {formik.errors.sub_off_semi &&
                    formik.touched.sub_off_semi ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.sub_off_semi}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="subject_sub">
                  <div className="subject__count">
                    <label htmlFor="sub_tut_hrs">
                      Number of tutorial hours
                    </label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="sub_tut_hrs"
                      value={formik.values.sub_tut_hrs}
                    >
                      <option value="">select one</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.sub_tut_hrs && formik.touched.sub_tut_hrs ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.sub_tut_hrs}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="subject">
                <div className="subject_sub">
                  <div className="subject__count">
                    <label htmlFor="sub_name">Subject name</label>
                    <input
                      type="text"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="sub_name"
                      value={formik.values.sub_name}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.sub_name && formik.touched.sub_name ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.sub_name}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="subject_sub">
                  <div className="subject__count">
                    <label htmlFor="sub_lab_hrs">number of lab hours</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="sub_lab_hrs"
                      value={formik.values.sub_lab_hrs}
                    >
                      <option value="">select one</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.sub_lab_hrs && formik.touched.sub_lab_hrs ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.sub_lab_hrs}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="subject">
                <div className="subject_sub">
                  <div className="subject__count">
                    <label htmlFor="sub_id">Subject code</label>
                    <input
                      type="text"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="sub_id"
                      value={formik.values.sub_id}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.sub_id && formik.touched.sub_id ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.sub_id}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="subject_sub">
                  <div className="subject__count">
                    <label htmlFor="level">Number of evalution hours</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="sub_eva_hrs"
                      value={formik.values.sub_eva_hrs}
                    >
                      <option value="">select one</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.sub_eva_hrs && formik.touched.sub_eva_hrs ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.sub_eva_hrs}{" "}
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

export default Subject;
