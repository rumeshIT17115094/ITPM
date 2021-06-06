import React from "react";
import { Link } from "react-router-dom";
import "./SessionNav.css";
const TimeTableNav = () => {
  return (
    <div className="btn-group m-4 rounded-border">
      <Link to="/generate_timetables/location">
        <p className="btn btn-primary m-2" aria-current="page">
          Location TimeTable
        </p>
      </Link>
      <Link to="/generate_timetables/lecture">
        <p className="btn btn-primary m-2">Group TimeTable</p>
      </Link>
      <Link to="/generate_lecturertimetable/stud_timetable">
        <p className="btn btn-primary m-2">Lecture TimeTable</p>
      </Link>
    </div>
  );
};

export default TimeTableNav;
