import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getBatches, createBatch} from '../../actions/batches'
import {updateStatus} from '../../actions/status'
import {getStudents, createStudent, deleteStudent, editStudent} from '../../actions/students'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

class BatchDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batch === null) this.props.getBatches()
      if (this.props.students === null) this.props.getStudents()
    }
  }

  createOnClick = () => {
    var studentName = prompt("Please enter students name")
    var studentPicture = prompt("Please enter the student picture URL")
    const batchNumber = this.props.batch.batchNumber
    var newStudent = {batchNumber, studentName, studentPicture}
    console.log("Creating batch number", batchNumber)
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

  editOnClick = (studentId) => {
    var studentName = prompt("Please enter students name")
    const studentEdit = {studentId, studentName}
    this.props.editStudent(studentEdit)
  }

  renderStudent = (student) => {
    const {history} = this.props

    if(student.batchNumber !== Number(this.props.currentBatch)) return

    return (
      <Card
        key={student.id}
        className="student-card"
        width="120">
      <CardHeader
        title={student.studentName}
        avatar={<Avatar src={student.studentPicture}/>}
      />
      <CardActions>
        <Button onClick={ () => this.editOnClick(student.id)} label="Edit">Edit</Button>
        <Button onClick={ () => this.deleteOnClick(student.id)} label="Delete">Delete</Button>
        <Button onClick={ () => this.evaluateOnClick(student.id)} label="Evaluate">Evaluate</Button>
    </CardActions>
    </Card>)
  }

  render() {
    const {batch, authenticated, userId, students} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (batch === null || students === null) return 'Loading...'
    if (!batch) return 'Not found'

    return (<Paper className="outer-paper">
      <h1>Batch # {batch.batchNumber}</h1>

      <p>Start date: {batch.startDate}</p>
      <p>End date: {batch.endDate}</p>
      <Button
        color="primary"
        variant="raised"
        onClick={ () => this.createOnClick()}
        className="create-student"
      >
        Create a new student
      </Button>

      <div>
        Each student
        {students.map(student => this.renderStudent(student))}
      </div>
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  batch: state.batches && state.batches[props.match.params.id],
  currentBatch: props.match.params.id,
  students: state.students === null ?
    null : Object.values(state.students)
})

const mapDispatchToProps = {
  getBatches, createBatch, getStudents, createStudent, deleteStudent, editStudent, updateStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails)
