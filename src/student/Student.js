import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./student.css";
import {
  UpdateStudents,
  addStudent,
  viewStudents,
} from "redux/student/StudentAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
const Student = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.getStudentsReducer);
  const [studentDetails, setStudentDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [docId, setdocId] = useState(null);
  const [generateId, setGenerateId] = useState("");

  const formik = useFormik({
    initialValues: {
      year_semister: "",
      programme: "",
      group_number: "",
      subGroup_number: "",
      groupId: "",
      subGroupId: "",
    },
    validationSchema: yup.object({
      year_semister: yup.string().required("year & semister is  required"),
      programme: yup.string().required("programme is required"),
      group_number: yup.string().required("group number is required"),
      subGroup_number: yup.string().required("sub group number is required"),
      groupId: yup.string().required("groupId is  required"),
      subGroupId: yup.string().required("subGroupId is  required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (isAdd) {
        dispatch(addStudent(values));
      } else {
        dispatch(UpdateStudents({ ...values, docId }));
      }
      setIsAdd(true);
      resetForm();
      setdocId(null);
    },
  });

  useEffect(() => {
    dispatch(viewStudents());
  }, []);

  const clearField = () => {
    formik.resetForm();
  };

  useEffect(() => {
    //console.log("student", student);
    setStudentDetails(students);
  }, [studentDetails, students]);

  const handleDelete = (docId) => {
    db.collection("students").doc(docId).delete();
  };
  const handleEdit = (data) => {
    setdocId(data.id);

    formik.setFieldValue("year_semister", data.year_semister);
    formik.setFieldValue("programme", data.programme);
    formik.setFieldValue("group_number", data.group_number);
    formik.setFieldValue("subGroup_number", data.subGroup_number);
    formik.setFieldValue("groupId", data.groupId);
    formik.setFieldValue("subGroupId", data.subGroupId);

    setIsAdd(false);
  };

  const GroupIdgenerator = () => {
    if (
      formik?.values?.year_semister !== "" &&
      formik?.values.programme !== "" &&
      formik?.values?.group_number !== "" &&
      formik?.values?.subGroup_number !== ""
    ) {
      const id =
        formik.values.year_semister +
        "." +
        formik.values.programme +
        "." +
        formik.values.group_number;
      const sid =
        formik.values.year_semister +
        "." +
        formik.values.programme +
        "." +
        formik.values.group_number +
        "." +
        formik.values.subGroup_number;
      formik.setFieldValue("groupId", id);
      formik.setFieldValue("subGroupId", sid);
      setGenerateId(id);
    }
  };
  const handleDefault = () => {
    formik.resetForm();
    setdocId(null);
    setIsAdd(true);
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Student </h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 m-2">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Year & Semister</th>
                  <th>Programme</th>
                  <th>Group Number</th>
                  <th>Sub Group Number</th>
                  <th>Group Id</th>
                  <th>Sub Group Id</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentDetails?.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.year_semister}</td>
                    <td>{res?.programme}</td>
                    <td>{res?.group_number}</td>
                    <td>{res?.subGroup_number}</td>
                    <td>{res?.groupId}</td>
                    <td>{res?.subGroupId}</td>

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
              className="frm-student"
              onSubmit={formik.handleSubmit}
            >
              <div className="student">
                <div className="student_sub">
                  <div className="student__count">
                    <label htmlFor="year_semister">
                      Academic year & semister
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="year_semister"
                      value={formik.values.year_semister}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.year_semister &&
                    formik.touched.year_semister ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.year_semister}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="student_sub">
                  <div className="student__count">
                    <label htmlFor="subGroup_number">Sub group Number</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="subGroup_number"
                      value={formik.values.subGroup_number}
                    >
                      <option value="">None</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.subGroup_number &&
                    formik.touched.subGroup_number ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.subGroup_number}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="student">
                <div className="student_sub">
                  <div className="student__count">
                    <label htmlFor="programme">Programme</label>
                    <input
                      type="text"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="programme"
                      value={formik.values.programme}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.programme && formik.touched.programme ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.programme}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="student_sub">
                  <div className="student__count">
                    <label htmlFor="groupId">Group Id</label>
                    <input
                      disabled
                      type="text"
                      className="form-control "
                      onChange={formik.handleChange}
                      name="groupId"
                      value={formik.values.groupId}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.groupId && formik.touched.groupId ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.groupId}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="student">
                <div className="student_sub">
                  <div className="student__count">
                    <label htmlFor="group_number">Group Number</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="group_number"
                      value={formik.values.group_number}
                    >
                      <option value="">None</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.group_number &&
                    formik.touched.group_number ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.group_number}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="student_sub">
                  <div className="student__count">
                    <label htmlFor="subGroupId">Sub Group Id</label>
                    <input
                      type="text"
                      disabled
                      className="form-control "
                      onChange={formik.handleChange}
                      name="subGroupId"
                      value={formik.values.subGroupId}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.subGroupId && formik.touched.subGroupId ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.subGroupId}{" "}
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
                  className="btn btn-danger ms-1"
                  type="button"
                  onClick={clearField}
                >
                  Clear
                </button>
                <button
                  className="btn btn-success ms-1"
                  type="button"
                  onClick={GroupIdgenerator}
                >
                  Generate Id
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
