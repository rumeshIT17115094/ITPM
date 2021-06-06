import React, { useState, useEffect } from "react";

import "./VIewSession.css";

import { useDispatch, useSelector } from "react-redux";
import { viewSession } from "redux/sessions/SessionAction";
import { db } from "firebase/FirebaseNew";
import SessionNav from "session-nav/SessionNav";

const ViewSession = () => {
  const dispatch = useDispatch();
  const { sessions } = useSelector((state) => state.getSessionsReducer);
  const [filterName, setFilterName] = useState("lecturer");
  const [searchName, setSearchName] = useState("");
  const [sessionsData, setSessionsData] = useState([]);

  useEffect(() => {
    setSessionsData(sessions);
  }, [sessions]);

  useEffect(() => {
    dispatch(viewSession());
  }, []);

  const handleDelete = (id) => {
    db.collection("sessions").doc(id).delete();
  };

  const searchResultData = (value, objName) => {
    return sessionsData.filter((res) =>
      res[objName].toLowerCase().match(value.toLowerCase())
    );
  };

  const searchResult = (e) => {
    if (e.target.value === "") {
      setSessionsData(sessions);
    } else {
      setSessionsData(searchResultData(e.target.value, filterName));
    }

    setSearchName(e.target.value);
  };

  return (
    <div className="container-fluid">
      <h4 className="text-center text-info">Add Session</h4>
      <SessionNav />
      <div className="container search-container">
        <input
          type="text"
          className="form-control search-box"
          placeholder="search by lecture & year"
          value={searchName}
          onChange={(e) => searchResult(e)}
        />
        <select
          className="form-select search-select"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        >
          <option value="lecturer">lecturer</option>
          <option value="subject">Subject</option>
          <option value="tag">Tag</option>
          <option value="group">Group Id</option>
        </select>
      </div>
      <div className="container-fluid mt-4">
        <div className="col-md-12 m-2">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Lecturer</th>
                <th>Subject </th>
                <th>Subject Name</th>
                <th>Group Id</th>
                <th>Tag</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sessionsData?.map((res) => (
                <tr key={res?.id}>
                  <td>{res?.lecturer}</td>
                  <td>{res?.subject}</td>
                  <td>{res?.subjectCode}</td>
                  <td>{res?.group}</td>
                  <td>{res?.tag}</td>
                  <td>{res?.duration}</td>

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
      </div>
    </div>
  );
};

export default ViewSession;
