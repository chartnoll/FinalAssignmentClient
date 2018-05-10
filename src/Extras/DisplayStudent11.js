import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getBatches, createBatch} from '../../actions/batches'
import {getEvaluations, createEvaluation} from '../../actions/evaluations'
import {getStudents, createStudent, deleteStudent, editStudent} from '../../actions/students'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip';
import EvaluationForm from './EvaluationForm'


class DisplayStudent extends PureComponent {
  componentWillMount() {
    console.log("ComponentWillMount has fired", this.props.status.studentId, this.props.status.batchNumber)
    if (this.props.authenticated) {
      if (this.props.students === null) this.props.getStudents()
      if (this.props.evaluations === null) this.props.getEvaluations()
    }
  }

  submitNewEvaluation = (data) =>{
    const payload = {
      studentId: this.props.currentStudent,
      teacherId: this.props.userId,
      color: data.color,
      remark: data.remark,
      date: data.date
    }
    this.props.createEvaluation(payload)
  }

  finishedOnClick = () => {
    <Redirect to="/login" />
  }

  editOnClick = (evalId) => {
    console.log("Edit this evaluation", evalId)
  }

  deleteOnClick = (evalId) => {
    console.log("Delete this evaluation", evalId)
  }

  renderEvaluation = (evaluation) => {
    const {history} = this.props

    console.log(evaluation.studentId, this.props.currentStudent, this.props.evaluation)

    if(evaluation.studentId !== Number(this.props.currentStudent)) return

    return (
      <Card
        key={evaluation.id}
        className="evaluation-card"
        width="120">
      <CardHeader
        title={evaluation.color}
      />
      <Typography variant="headline" component="h2">
        Date: {evaluation.date}
      </Typography>
      <Typography color="textSecondary">
        Remark: {evaluation.remark}
      </Typography>
      <CardActions>
        <Button onClick={ () => this.editOnClick(evaluation.id)} label="Edit">Edit</Button>
        <Button onClick={ () => this.deleteOnClick(evaluation.id)} label="Delete">Delete</Button>
      </CardActions>
      </Card>
    )
  }

  // onRequestDelete={handleRequestDelete}
  // <Avatar src={student.studentPicture} />


  render() {
    const {authenticated, students, userId, evaluations} = this.props

    const currentStudent = this.props.match.params.id

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    // if( students === null ) return null

    if( evaluations === null || students === null) return null

    return (<Paper className="outer-paper">
      <h1>{students[this.props.currentStudent].studentName} Evaluations</h1>

      <p>You are: {userId}</p>

      <Button
        color="primary"
        variant="raised"
        onClick={ () => this.finishedOnClick()}
        className="create-student"
      >
        Finished
      </Button>

      <EvaluationForm onSubmit={this.submitNewEvaluation}/>


      Each Evaluation
      {evaluations.map((evaluation) => this.renderEvaluation(evaluation))}
    </Paper>)
  }
}

const mapDispatchToProps = {
  getStudents, getEvaluations, createEvaluation
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  // firstStudent: state.students && state.batches[props.match.params.id],
  students: state.students === null ?
    null : Object.values(state.students),
  evaluations: state.evaluations === null ?
    null : Object.values(state.evaluations),
  currentStudent: props.match.params.id,
  status: state.status !== null
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayStudent)
