import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getBatches, createBatch} from '../../actions/batches'
import {getEvaluations} from '../../actions/evaluations'
import {updateStatus} from '../../actions/status'
import {getStudents, createStudent, deleteStudent, editStudent, getRandomStudent} from '../../actions/students'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import StudentCard from './StudentCard'
import StudentForm from './StudentForm'
import Grid from 'material-ui/Grid';

class BatchDetails extends PureComponent {
  state = {
    createToggle : false
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batch === null) this.props.getBatches()
      if (this.props.students === null) this.props.getStudents()
      if (this.props.evaluations === null) this.props.getEvaluations()
    }
  }

  randomStudentClick = () => {
    const {history, currentBatch} = this.props
    this.props.getRandomStudent(currentBatch)
    history.push(`/randomstudent/${currentBatch}`)
  }

  toggleCreator = () => {
    const newValue = this.state.createToggle === true ?
      false : true
    this.setState({createToggle: newValue})
  }

  onSubmit = (newStudent) => {
    this.props.createStudent(newStudent)
  }

  evaluateOnClick = (studentId) => {
    const {history, currentBatch} = this.props
    this.props.updateStatus({studentId, currentBatch})
    history.push(`/students/${studentId}`)
  }

  deleteOnClick = (studentId) => {
    this.props.deleteStudent(studentId, this.props.students)
    this.props.getStudents(this.props.batch.batchNumber)
  }

  render() {
    const {batch, authenticated, userId, students, evaluations} = this.props

    if (!authenticated) return <Redirect to="/login" />

    if (batch === null || students === null || evaluations === null) return 'Loading...'
    if (!batch) return 'Not found'

    return (<Paper className="outer-paper">
      <h1>Batch # {batch.batchNumber}</h1>

      <p>Start date: {batch.startDate}</p>
      <p>End date: {batch.endDate}</p>

      <div>
      <Button
        color="primary"
        variant="raised"
        onClick={ () => this.randomStudentClick()}
        className="randomStudent"
      >
        Random Student!
      </Button>
      </div>

      { this.state.createToggle &&
        <div><StudentForm onSubmit={this.onSubmit}/></div>}

      { !this.state.createToggle &&
        <div>
          <Button
            color="primary"
            variant="raised"
            onClick={ () => this.toggleCreator()}
            className="create-student"
          >
            Create a new student
          </Button>
        </div>
      }

      { this.state.createToggle &&
        <div>
          <Button
            color="primary"
            variant="raised"
            onClick={ () => this.toggleCreator()}
            className="cancel-student"
          >
            Cancel
          </Button>
        </div>
      }

      <div>
      <Grid container spacing={32}>
          {students.map((student, index) => {
            if(student.batchNumber === Number(this.props.currentBatch)){
              return (<StudentCard student={student}
                evaluateOnClick={this.evaluateOnClick}
                deleteOnClick={this.deleteOnClick}
                editStudent={this.props.editStudent}
                evaluations={evaluations}
                index={index}/>)
            }})}
      </Grid>
      </div>
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  batch: state.batches && state.batches[props.match.params.id],
  evaluations: state.evaluations === null ?
    null : Object.values(state.evaluations),
  currentBatch: props.match.params.id,
  students: state.students === null ?
    null : Object.values(state.students)
})

const mapDispatchToProps = {
  getBatches, createBatch, getStudents, createStudent, deleteStudent, editStudent, updateStatus, getEvaluations, getRandomStudent
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails)
