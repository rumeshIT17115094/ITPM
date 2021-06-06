import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewStudents } from "redux/student/StudentAction";
import { viewSessionHandler } from "redux/session-handler/SessionHandlerAction";
import jsPDF from "jspdf";
import "jspdf-autotable";
import TimeTableNav from "session-nav/TimeTableNav";
const GroupTimeTable = () => {
  const doc = new jsPDF();
  const dispatch = useDispatch();
  const [studentsData, setStudentsData] = useState([]);
  const { students } = useSelector((state) => state.getStudentsReducer);
  const { sessionHandlers } = useSelector(
    (state) => state.getSessionHandlerReducer
  );
  const DayArray = [
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
    { day: "Sunday" },
  ];
  const [groupId, setGroupId] = useState("");
  const [sessionHandler, setSessionHandler] = useState([]);

  useEffect(() => {
    setStudentsData(students);
  }, [students]);

  const generatePdf = () => {
    doc.autoTable({ html: "#groupTable" });
    doc.save("table.pdf");
  };

  const handleChange = (e) => {
    const timeTable = sessionHandlers.filter(
      (res) => res.session.split("-")[3] === e.target.value
    );
    console.log("timeTable", timeTable);
    setSessionHandler(timeTable);
    setGroupId(e.target.value);
  };

  useEffect(() => {
    dispatch(viewStudents());
    dispatch(viewSessionHandler());
  }, []);

  const PrintTimeTable = (stime, etime) => {
    let newArr = [];
    DayArray.forEach(({ day }) => {
      let tempArr = [];
      let isData = false;

      sessionHandler.forEach((res) => {
        if ((res.time === stime || res.etime === etime) && res.day === day) {
          tempArr.push(res);
          isData = true;
        }
      });
      if (!isData) {
        newArr.push([]);
      } else {
        newArr.push(tempArr);
      }
    });
    //console.log("newArr", newArr);
    return newArr;
  };

  return (
    <div className="container-fluid">
      <TimeTableNav />
      <div className="row">
        <div className="col-md-6">
          <div className="form-group d-flex m-4">
            <label htmlFor="group" style={{ width: "180px" }}>
              Select Group
            </label>
            <select
              className="form-select"
              onChange={(e) => {
                handleChange(e);
              }}
              name="group"
              value={groupId}
            >
              <option value="">Select one</option>
              {studentsData?.map(({ groupId, id }) => (
                <option value={groupId} key={id}>
                  {groupId}
                </option>
              ))}

              {studentsData?.map(({ subGroupId, id }) => (
                <option value={subGroupId} key={id}>
                  {subGroupId}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="m-4">
            <button className="btn btn-info">Generate</button>
            <button className="btn btn-success ms-2" onClick={generatePdf}>
              Print
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <table className="table table-light table-striped" id="groupTable">
          <thead>
            <tr>
              <th>Time Slots</th>
              <th>Monday</th>
              <th>TuesDay</th>
              <th>WednesDay</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
              <th>Sunday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>8.30-9.30</td>

              {PrintTimeTable("08:30", "09:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
            <tr>
              <td>9.30-10.30</td>
              {PrintTimeTable("09:30", "10:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
            <tr>
              <td>10.30-11.30</td>
              {PrintTimeTable("10:30", "11:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
            <tr>
              <td>11.30-12.30</td>
              {PrintTimeTable("11:30", "12:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
            <tr>
              <td>12.30-1.30</td>
              {PrintTimeTable("12:30", "13:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
            <tr>
              <td>1.30-2.30</td>
              {PrintTimeTable("13:30", "14:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
            <tr>
              <td>2.30-3.30</td>
              {PrintTimeTable("14:30", "15:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
            <tr>
              <td>3.30-4.30</td>
              {PrintTimeTable("15:30", "16:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
            <tr>
              <td>4.30-5.30</td>
              {PrintTimeTable("16:30", "17:30").map((res, i) =>
                res.length === 0 ? (
                  <td key={i}>X</td>
                ) : (
                  <td key={i}>
                    {res.map((result, j) => (
                      <p key={i + j}>{result.session}</p>
                    ))}
                  </td>
                )
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTimeTable;
