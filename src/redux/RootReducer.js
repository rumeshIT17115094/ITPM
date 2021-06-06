import { combineReducers } from "redux";
import {
  WorkingdaysReducer,
  get_workingdays,
  update_workingdays_Reducer,
} from "./workingDays/WorkingDaysReducer";
import {
  LecturerReducer,
  get_lecturers,
  update_lecturer_Reducer,
} from "./lecturer/LecturerReducer";
import {
  SubjectReducer,
  get_Subjects,
  update_subject_Reducer,
} from "./subject/SubjectReducer";
import {
  get_tagReducer,
  tagReducer,
  update_tagReducer,
} from "./tags/TagReducer";
import {
  LocationReducer,
  getLocationsReducer,
  update_location_Reducer,
} from "./location/LocationReducer";
import {
  SessionReducer,
  getSessionsReducer,
  update_session_Reducer,
} from "./sessions/SessionReducer";
import {
  StudentReducer,
  getStudentsReducer,
  update_student_Reducer,
} from "./student/StudentReducer";
import {
  ParallelSessionReducer,
  getParallelSessionsReducer,
  update_Parallelsession_Reducer,
} from "./parallel/ParallelReducer";
import {
  ConsecutiveSessionReducer,
  getConsecutiveSessionsReducer,
  update_Consecutivesession_Reducer,
} from "./consecutive/ConsecutiveReducer";
import {
  RoomSessionReducer,
  getRoomSessionsReducer,
  update_Roomsession_Reducer,
} from "./session-room/RoomSessionReducer";
import {
  NotAllocateReducer,
  getNotAllocateReducer,
  update_NotAllocate_Reducer,
} from "./not-allocated/NotAllocatedReducer";
import {
  NotAllocateRoomReducer,
  getNotAllocateRoomReducer,
  update_NotAllocateRoom_Reducer,
} from "./notAllocated-room/NotAllocatedRoomReducer";

import {
  SessionHandlerRoomReducer,
  getSessionHandlerReducer,
  update_SessionHandler_Reducer,
} from "redux/session-handler/SessionHandlerReducer";

const rootReducer = combineReducers({
  SessionHandlerRoomReducer: SessionHandlerRoomReducer,
  getSessionHandlerReducer: getSessionHandlerReducer,
  update_SessionHandler_Reducer: update_SessionHandler_Reducer,
  NotAllocateRoomReducer: NotAllocateRoomReducer,
  getNotAllocateRoomReducer: getNotAllocateRoomReducer,
  update_NotAllocateRoom_Reducer: update_NotAllocateRoom_Reducer,
  NotAllocateReducer: NotAllocateReducer,
  getNotAllocateReducer: getNotAllocateReducer,
  update_NotAllocate_Reducer: update_NotAllocate_Reducer,
  RoomSessionReducer: RoomSessionReducer,
  getRoomSessionsReducer: getRoomSessionsReducer,
  update_Roomsession_Reducer: update_Roomsession_Reducer,
  ConsecutiveSessionReducer: ConsecutiveSessionReducer,
  getConsecutiveSessionsReducer: getConsecutiveSessionsReducer,
  update_Consecutivesession_Reducer: update_Consecutivesession_Reducer,
  ParallelSessionReducer: ParallelSessionReducer,
  getParallelSessionsReducer: getParallelSessionsReducer,
  update_Parallelsession_Reducer: update_Parallelsession_Reducer,
  SessionReducer: SessionReducer,
  getSessionsReducer: getSessionsReducer,
  update_session_Reducer: update_session_Reducer,
  StudentReducer: StudentReducer,
  getStudentsReducer: getStudentsReducer,
  update_student_Reducer: update_student_Reducer,
  get_tagReducer: get_tagReducer,
  tagReducer: tagReducer,
  update_tagReducer: update_tagReducer,
  WorkingdaysReducer: WorkingdaysReducer,
  get_workingdaysReducer: get_workingdays,
  update_workingdays_Reducer: update_workingdays_Reducer,
  LecturerReducer: LecturerReducer,
  get_lecturersReducer: get_lecturers,
  update_lecturer_Reducer: update_lecturer_Reducer,
  SubjectReducer: SubjectReducer,
  get_SubjectsReducer: get_Subjects,
  update_subject_Reducer: update_subject_Reducer,
  LocationReducer: LocationReducer,
  getLocationsReducer: getLocationsReducer,
  update_location_Reducer: update_location_Reducer,
});

export default rootReducer;
