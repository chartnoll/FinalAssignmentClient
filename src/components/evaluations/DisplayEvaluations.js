import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getEvaluations, createEvaluation} from '../../actions/evaluations'
import {getStudents} from '../../actions/students'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import EvaluationForm from './EvaluationForm'
import EvaluationCard from './EvaluationCard'

class DisplayStudent extends PureComponent {

  matchStudent = () => {
    return this.props.students.filter( (student) =>
      student.id === Number(this.props.currentStudent))[0]
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.students === null) this.props.getStudents()
      if (this.props.evaluations === null) this.props.getEvaluations()
    }
  }

  finishedOnClick = () => {
    const {history} = this.props
    history.push(`/batches/${this.matchStudent().batchNumber}`)
  }

  saveOnClick = () => {
    const {history} = this.props
    history.push(`/batches/${this.matchStudent().batchNumber}`)
  }

  render() {
    const {authenticated, students, userId, evaluations, currentStudent} = this.props

    if (!authenticated) return <Redirect to="/login" />
    if( evaluations === null || students === null || currentStudent === null) return null

    return (<Paper className="outer-paper">
      <h1>{this.matchStudent().studentName} Evaluations</h1>

      <p>You are: {userId}</p>

      <Button
        color="primary"
        variant="raised"
        onClick={ () => this.saveOnClick()}
        className="create-student"
      >Save and Next
      </Button>

      <Button
        color="primary"
        variant="raised"
        onClick={ () => this.finishedOnClick()}
        className="create-student"
      >Finished
      </Button>
      <br/>

      <EvaluationForm
      currentStudent={currentStudent}
      userId={this.props.userId}/>
      <br/>

      {evaluations.map((evaluation) => {if(Number(evaluation.studentId) === Number(currentStudent))
          return <EvaluationCard evaluation={evaluation}/>})}
    </Paper>)
  }
}

const mapDispatchToProps = {
  getStudents, getEvaluations, createEvaluation
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  students: state.students === null ?
    null : Object.values(state.students),
  evaluations: state.evaluations === null ?
    null : Object.values(state.evaluations),
  currentStudent: props.match.params.id
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayStudent)
