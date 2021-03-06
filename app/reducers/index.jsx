import { combineReducers } from 'redux'
import campuses from './campuses'
import students from './students'
import currentCampus from './currentCampus'
import currentStudents from './currentStudents'
import newStudentEntry from './newStudentEntry'
import showForm from './showForm'
import singleStudent from './singleStudent'
import writeCampus from './newCampusEntry'

const initialState = {}


const rootReducer = combineReducers({
  campuses,
  students,
  currentCampus, 
  currentStudents,
  newStudentEntry,
  showForm,
  singleStudent,
  writeCampus
})

export default rootReducer
