import "./App.css";
import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Navbar from "navbar/Navbar";
import Home from "home/Home";
import WorkingDays from "working-days-hours/WorkingDays";
import Lecturer from "lecturer/Lecturer";
import Subject from "subject/Subject";
import Tag from "tag/Tag";
import Location from "locations/Location";
import ChartData from "statistics/ChartData";
import Student from "student/Student";
import AddSession from "session/AddSession";
import ViewSession from "session/ViewSession";
import ParallelSession from "parallel/ParallelSession";
import Consecutive from "consecutive/Consecutive";
import RoomSession from "session-room/RoomSession";
import NotAllocated from "NotAllocated/NotAllocated";
import NotAllocatedRoom from "not-allocated-room/NotAllocatedRoom";
import SessionHandlerComponent from "session-handler/SessionHandlerComponent";
import GroupTimeTable from "time-table/GroupTimeTable";
import LecturerTimeTable from "time-table/LecturerTimeTable";
import LocationTimeTable from "time-table/LocationTimeTable";

function App() {
  return (
    <React.Fragment>
      <HashRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/workingdays/add" component={WorkingDays} />
          <Route exact path="/lecturer/add" component={Lecturer} />
          <Route exact path="/subject/add" component={Subject} />
          <Route exact path="/student/tag/add" component={Tag} />
          <Route exact path="/location/building/add" component={Location} />
          <Route exact path="/statistic" component={ChartData} />
          <Route exact path="/student/year_semister/add" component={Student} />
          <Route exact path="/session/add" component={AddSession} />
          <Route exact path="/session/view" component={ViewSession} />
          <Route exact path="/parallel" component={ParallelSession} />
          <Route exact path="/consecutive" component={Consecutive} />
          <Route exact path="/room/session" component={RoomSession} />
          <Route exact path="/notAllocated" component={NotAllocated} />
          <Route exact path="/notAllocatedRoom" component={NotAllocatedRoom} />
          <Route
            exact
            path="/generate_lecturertimetable/stud_timetable"
            component={LecturerTimeTable}
          />
          <Route
            exact
            path="/sessionHandler"
            component={SessionHandlerComponent}
          />
          <Route
            exact
            path="/generate_timetables/lecture"
            component={GroupTimeTable}
          />
          <Route
            exact
            path="/generate_timetables/location"
            component={LocationTimeTable}
          />
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
}

export default App;
