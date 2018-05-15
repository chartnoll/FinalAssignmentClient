import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getEvaluations, createEvaluation} from '../../actions/evaluations'
import {getStudents, createStudent, deleteStudent, editStudent} from '../../actions/students'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import EvaluationForm from './EvaluationForm'
import EvaluationCard from './EvaluationCard'
import {updateStatus} from '../../actions/status'

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

  // submitNewEvaluation = (data) =>{
  //   const payload = {
  //     studentId: this.props.currentStudent,
  //     teacherId: this.props.userId,
  //     color: data.color,
  //     remark: data.remark,
  //     date: data.date
  //   }
  //   this.props.createEvaluation(payload)
  // }

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

    console.log(evaluations[2].studentId, currentStudent)

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

      {evaluations.map((evaluation) => {
        if(evaluation.studentId === Number(currentStudent)){
          return <EvaluationCard evaluation={evaluation}/>
      }})}
    </Paper>)
  }
}

const mapDispatchToProps = {
  getStudents, getEvaluations, createEvaluation, updateStatus
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  students: state.students === null ?
    null : Object.values(state.students),
  evaluations: state.evaluations === null ?
    null : Object.values(state.evaluations),
  currentStudent: props.match.params.id,
  status: state.status
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayStudent)
