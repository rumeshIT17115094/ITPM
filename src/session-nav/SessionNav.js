import React from "react";
import { Link } from "react-router-dom";
import "./SessionNav.css";
const SessionNav = () => {
  return (
    <div className="btn-group m-4 rounded-border">
      <Link to="/room/session">
        <p className="btn btn-primary m-2" aria-current="page">
          Manage Session
        </p>
      </Link>
      <Link to="/session/view">
        <p className="btn btn-primary m-2">Session Details</p>
      </Link>
      <Link to="/consecutive">
        <p className="btn btn-primary m-2">Consecutive</p>
      </Link>
      <Link to="/parallel">
        <p className="btn btn-primary m-2">Parallel</p>
      </Link>
      <Link to="/notAllocated">
        <p className="btn btn-primary m-2">Not-allocated</p>
      </Link>
      <Link to="notAllocatedRoom">
        <p className="btn btn-primary m-2">Not-allocaetd-room</p>
      </Link>
    </div>
  );
};

export default SessionNav;
