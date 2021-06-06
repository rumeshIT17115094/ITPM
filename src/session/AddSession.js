import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./AddSession.css";
import { addSession } from "redux/sessions/SessionAction";
import { useDispatch, useSelector } from "react-redux";
import { viewLecturer } from "redux/lecturer/LecturerAction";
import { viewTag } from "redux/tags/TagAction";
import { viewSubject } from "redux/subject/SubjectAction";
import { viewStudents } from "redux/student/StudentAction";
const AddSession = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.getStudentsReducer);
  const { tags } = useSelector((state) => state.get_tagReducer);
  const { subject } = useSelector((state) => state.get_SubjectsReducer);
  const { lecturer } = useSelector((state) => state.get_lecturersReducer);

  const [studentsData, setStudentsData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [subjectsData, setSubjectsData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);

  useEffect(() => {
    setStudentsData(students);
  }, [students]);
  useEffect(() => {
    setTagsData(tags);
  }, [tags]);
  useEffect(() => {
    setSubjectsData(subject);
  }, [subject]);
  useEffect(() => {
    console.log("lecturer", lecturer);
    setLecturerData(lecturer);
  }, [lecturer]);

  const formik = useFormik({
    initialValues: {
      lecturer: "",
      tag: "",
      group: "",
      subject: "",
      studentsCount: "",
      duration: "",
    },
    validationSchema: yup.object({
      lecturer: yup.string().required("lecturer is  required"),
      tag: yup.string().required("tag is required"),
      group: yup.string().required("group is required"),
      subject: yup.string().required("subject is  required"),
      studentsCount: yup.number().required("No of students required"),
      duration: yup.string().required("duration is  required"),
    }),
    onSubmit: (values, { resetForm }) => {
      //   console.log("values", values);
      const subjectCode = subjectsData.find(
        (res) => res.sub_name === values.subject
      )?.sub_id;
      dispatch(addSession({ ...values, subjectCode }));
      resetForm();
    },
  });

  useEffect(() => {
    dispatch(viewLecturer());
    dispatch(viewSubject());
    dispatch(viewTag());
    dispatch(viewStudents());
  }, []);

  const clearField = () => {
    formik.resetForm();
  };

  const handleDefault = () => {
    formik.resetForm();
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Add Session</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 m-2">
            <form
              id="frm"
              className="frm-lecturer"
              onSubmit={formik.handleSubmit}
            >
              <div className="lecturer">
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="lecturer">Selected lecturer</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="lecturer"
                      value={formik.values.lecturer}
                    >
                      <option value="">Select one</option>
                      {lecturerData?.map(({ name, id }) => (
                        <option value={name} key={id}>
                          {name}
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
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="tag">Select Tag</label>
                    <select
                      className="form-select "
                      onChange={formik.handleChange}
                      name="tag"
                      value={formik.values.tag}
                    >
                      <option value="">Select one</option>
                      {tagsData?.map(({ relatedTag, id }) => (
                        <option value={relatedTag} key={id}>
                          {relatedTag}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.tag && formik.touched.tag ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.tag}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="lecturer">
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="group">Select Group</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="group"
                      value={formik.values.group}
                    >
                      <option value="">Select one</option>
                      {studentsData?.map(({ groupId, subGroupId, id }) => (
                        <option
                          value={
                            ["Lecture", "Tutorial"].includes(formik.values.tag)
                              ? groupId
                              : subGroupId
                          }
                          key={id}
                        >
                          {["Lecture", "Tutorial"].includes(formik.values.tag)
                            ? groupId
                            : subGroupId}
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
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="studentsCount">No of Students</label>
                    <input
                      className="form-control "
                      type="number"
                      onChange={formik.handleChange}
                      name="studentsCount"
                      value={formik.values.studentsCount}
                    />
                  </div>
                  <div className="error_div">
                    {formik.errors.studentsCount &&
                    formik.touched.studentsCount ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.studentsCount}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="lecturer">
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="subject">Select Subject</label>
                    <select
                      className="form-select "
                      onChange={formik.handleChange}
                      name="subject"
                      value={formik.values.subject}
                    >
                      <option value="">Select one</option>
                      {subjectsData?.map(({ sub_name, id }) => (
                        <option value={sub_name} key={id}>
                          {sub_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="error_div">
                    {formik.errors.subject && formik.touched.subject ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.subject}{" "}
                      </h6>
                    ) : null}
                  </div>
                </div>
                <div className="lecturer_sub">
                  <div className="lecturer__count">
                    <label htmlFor="duration">Duration</label>
                    <select
                      className="form-select"
                      onChange={formik.handleChange}
                      name="duration"
                      value={formik.values.duration}
                    >
                      <option value="">none</option>
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
                    {formik.errors.duration && formik.touched.duration ? (
                      <h6 className={"text-warning text-center"}>
                        <i className="fas fa-exclamation"></i>
                        {formik.errors.duration}{" "}
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

export default AddSession;
