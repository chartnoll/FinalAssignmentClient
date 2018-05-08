import {ADD_STUDENT, UPDATE_STUDENT, UPDATE_STUDENTS} from '../actions/students'

/*
The state will contain the games in an object with the game ID as key
*/

export default (state = null, {type, payload}) => {
  // return state
  // }

  switch (type) {
    case ADD_STUDENT:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_STUDENT:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_STUDENTS:
      return payload.reduce((students, student) => {
        students[student.id] = student
        return students
      }, {})

    default:
      return state
  }
}
