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
import EvaluationCard from './EvaluationCard'

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

  render() {
    const {authenticated, students, userId, evaluations, currentStudent} = this.props

    if (!authenticated) return <Redirect to="/login" />
    if( evaluations === null || students === null) return null

    return (<Paper className="outer-paper">
      <h1>{students[currentStudent].studentName} Evaluations</h1>

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
      {evaluations.map((evaluation) => {
        if(evaluation.studentId === Number(this.props.currentStudent)){
          return <EvaluationCard evaluation={evaluation}/>
      }})}
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
