import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import usecheck from "useHooks/useCheck";
import ApartmentIcon from "@material-ui/icons/Apartment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import PrintIcon from "@material-ui/icons/Print";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "rgb(36, 35, 35)",
    color: "white",
    fontFamily: "Iceland cursive",
  },
  nested: {
    paddingLeft: theme.spacing(8),
  },
  sub_nested: {
    paddingLeft: theme.spacing(10),
    color: "white",
  },
}));

const HomeList = () => {
  console.log("HomeList Created");
  const classes = useStyles();
  const lectureData = usecheck(false);
  const sessionData = usecheck(false);
  const studentData = usecheck(false);
  const sub_studentData = usecheck(false);
  const sub_tagData = usecheck(false);
  const locationData = usecheck(false);
  const sub_buildingData = usecheck(false);
  const workData = usecheck(false);
  const StatisticData = usecheck(false);
  const GenerateTimetableData = usecheck(false);
  const sub_generatetimetabledata = usecheck(false);
  const sub_viewtimetableData = usecheck(false);

  return (
    <div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            style={{ color: "white" }}
            component="div"
            id="nested-list-subheader"
          >
            Management Navigation List
          </ListSubheader>
        }
        className={classes.root}
      >
        {/* student list */}
        <ListItem button onClick={studentData.handleClick}>
          <ListItemIcon>
            <PeopleOutlineIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Students" />
          {studentData.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {/* student >year&semister  sub list */}
        <Collapse in={studentData.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={sub_studentData.handleClick}
            >
              <ListItemText primary="Student Details" />
              {sub_studentData.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {/* student > year & semister sub list */}
            <Collapse in={sub_studentData.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* student > year & semister > Add sub list */}
                <Link to="/student/year_semister/add">
                  <ListItem button className={classes.sub_nested}>
                    <ListItemText primary="Add" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            {/* student > group number list */}

            <ListItem
              button
              onClick={sub_tagData.handleClick}
              className={classes.nested}
            >
              <ListItemText primary="Student Tag" />
              {sub_tagData.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={sub_tagData.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* student > group_id > Add sub list */}
                <Link to="/student/tag/add">
                  <ListItem button className={classes.sub_nested}>
                    <ListItemText primary="Add" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </List>
        </Collapse>

        <ListItem button onClick={sessionData.handleClick}>
          <ListItemIcon>
            <VerticalSplitIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Sessions" />
          {sessionData.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={sessionData.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/room/session">
              <ListItem button className={classes.sub_nested}>
                <ListItemText primary="Manage Session" />
              </ListItem>
            </Link>
            <Link to="/session/add">
              <ListItem button className={classes.sub_nested}>
                <ListItemText primary="Add new session" />
              </ListItem>
            </Link>
            <Link to="/session/view">
              <ListItem button className={classes.sub_nested}>
                <ListItemText primary="Session details" />
              </ListItem>
            </Link>
            <Link to="/consecutive">
              <ListItem button className={classes.sub_nested}>
                <ListItemText primary="consecutive" />
              </ListItem>
            </Link>
            <Link to="/parallel">
              <ListItem button className={classes.sub_nested}>
                <ListItemText primary="parallel" />
              </ListItem>
            </Link>
            <Link to="/notAllocated">
              <ListItem button className={classes.sub_nested}>
                <ListItemText primary="Not Allocated" />
              </ListItem>
            </Link>
            <Link to="notAllocatedRoom">
              <ListItem button className={classes.sub_nested}>
                <ListItemText primary="Not Allocated Room" />
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <ListItem button onClick={lectureData.handleClick}>
          <ListItemIcon>
            <SupervisedUserCircleIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Lectures" />
          {lectureData.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={lectureData.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/lecturer/add">
              <ListItem button className={classes.nested}>
                <ListItemText primary="Add" />
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <ListItem button onClick={workData.handleClick}>
          <AccessTimeIcon>
            <ImportContactsIcon style={{ color: "white" }} />
          </AccessTimeIcon>
          <ListItemText primary="Working days & hours" />
          {workData.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={workData.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/workingdays/add">
              <ListItem button className={classes.nested}>
                <ListItemText primary="Add" />
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <ListItem button onClick={StatisticData.handleClick}>
          <ListItemIcon>
            <EqualizerIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
          {StatisticData.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={StatisticData.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/statistic">
              {" "}
              <ListItem button className={classes.nested}>
                <ListItemText primary="View" />
              </ListItem>
            </Link>
          </List>
        </Collapse>

        <ListItem button onClick={locationData.handleClick}>
          <ListItemIcon>
            <ApartmentIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Location" />
          {locationData.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {/* student >year&semister  sub list */}
        <Collapse in={locationData.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={sub_buildingData.handleClick}
            >
              <ListItemText primary="Building" />
              {sub_buildingData.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {/* student > year & semister sub list */}
            <Collapse in={sub_buildingData.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {/* student > year & semister > Add sub list */}
                <Link to="/location/building/add">
                  <ListItem button className={classes.sub_nested}>
                    <ListItemText primary="Add" />
                  </ListItem>
                </Link>
                {/* student > year & semister >view sub list */}
              </List>
            </Collapse>
            {/* student > group number list */}
          </List>
        </Collapse>

        <ListItem button onClick={GenerateTimetableData.handleClick}>
          <ListItemIcon>
            <PrintIcon style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary=" Generate Time Table" />
          {GenerateTimetableData.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={GenerateTimetableData.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={sub_generatetimetabledata.handleClick}
            >
              <ListItemText primary="view Time Table" />
              {sub_generatetimetabledata.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse
              in={sub_generatetimetabledata.open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <Link to="/generate_timetables/location">
                  <ListItem button className={classes.sub_nested}>
                    <ListItemText primary="Generate Location time-table" />
                  </ListItem>
                </Link>

                <Link to="/generate_lecturertimetable/stud_timetable">
                  <ListItem button className={classes.sub_nested}>
                    <ListItemText primary="Generate Lecture Time-Table" />
                  </ListItem>
                </Link>
                <Link to="/generate_timetables/lecture">
                  <ListItem button className={classes.sub_nested}>
                    <ListItemText primary="Generate Group Time-Table" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>

            <ListItem
              button
              onClick={sub_viewtimetableData.handleClick}
              className={classes.nested}
            >
              <ListItemText primary="add Time Table" />
              {sub_viewtimetableData.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={sub_viewtimetableData.open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <Link to="/sessionHandler">
                  <ListItem button className={classes.sub_nested}>
                    <ListItemText primary="Add Session Time" />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default HomeList;
