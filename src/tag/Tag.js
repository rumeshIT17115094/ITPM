import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import "./Tag.css";
import { UpdateTag, addTag, viewTag } from "redux/tags/TagAction";
import { useDispatch, useSelector } from "react-redux";
import { db } from "firebase/FirebaseNew";
const Tag = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.get_tagReducer);
  const [tagDetails, setTagDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(true);
  const [docId, setdocId] = useState(null);
  const formik = useFormik({
    initialValues: {
      tag: "",
      tagCode: "",
      relatedTag: "",
    },
    validationSchema: yup.object({
      tag: yup.string().required("tag name is required"),
      tagCode: yup.string().required("tagcode is required"),
      relatedTag: yup.string().required("related tag is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      //   console.log("values", values);
      if (isAdd) {
        dispatch(addTag(values));
      } else {
        dispatch(UpdateTag({ ...values, docId }));
      }
      setIsAdd(true);
      resetForm();
      setdocId(null);
    },
  });

  useEffect(() => {
    dispatch(viewTag());
  }, []);

  useEffect(() => {
    setTagDetails(tags);
  }, [tags]);

  const handleDelete = (docId) => {
    db.collection("tags").doc(docId).delete();
  };
  const handleEdit = (data) => {
    // console.log("data", data);
    setdocId(data.id);
    formik.setFieldValue("tag", data.tag);
    formik.setFieldValue("tagCode", data.tagCode);
    formik.setFieldValue("relatedTag", data.relatedTag);

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
      <h4 className="text-center text-info">Tags</h4>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mt-4">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Tags</th>
                  <th>TagCode</th>
                  <th>Related Tag</th>
                  <th>Action</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tagDetails.map((res) => (
                  <tr key={res?.id}>
                    <td>{res?.tag}</td>
                    <td>{res?.tagCode}</td>
                    <td>{res?.relatedTag}</td>
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
            <form id="frm" className="tag-form" onSubmit={formik.handleSubmit}>
              <div className="workingDays__count">
                <label htmlFor="tag">Tag Name</label>
                <input
                  type="text"
                  className="form-control "
                  onChange={formik.handleChange}
                  name="tag"
                  value={formik.values.tag}
                />
              </div>
              <div className="error_div">
                {formik.errors.tag && formik.touched.tag ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.tag}
                  </h6>
                ) : null}
              </div>
              <div className="workingDays__count">
                <label htmlFor="tagCode">Tag Code</label>
                <input
                  type="text"
                  className="form-control "
                  onChange={formik.handleChange}
                  name="tagCode"
                  value={formik.values.tagCode}
                />
              </div>
              <div className="error_div">
                {formik.errors.tagCode && formik.touched.tagCode ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.tagCode}
                  </h6>
                ) : null}
              </div>
              <div className="workingDays__count">
                <label htmlFor="relatedTag">Related Tag</label>
                <select
                  className="form-select select__list"
                  onChange={formik.handleChange}
                  name="relatedTag"
                  value={formik.values.relatedTag}
                >
                  <option value="">None</option>
                  <option value="Lecture">Lecture</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Lab">Lab</option>
                </select>
              </div>
              <div className="error_div">
                {formik.errors.relatedTag && formik.touched.relatedTag ? (
                  <h6 className={"text-warning text-center"}>
                    <i className="fas fa-exclamation"></i>
                    {formik.errors.relatedTag}
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
                <button
                  className="btn btn-warning ms-1"
                  type="button"
                  onClick={clearField}
                >
                  Clear
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tag;
