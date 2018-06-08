import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getEvaluations} from '../../actions/evaluations'
import {getStudents, editStudent} from '../../actions/students'

class RandomStudent extends PureComponent {
  state = {
    randomStudent: -1
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.students === null) this.props.getStudents()
      if (this.props.evaluations === null) this.props.getEvaluations()
    }
  }

  generateRandomStudent = () => {
    const batch = Number(this.props.currentBatch)
    const students = this.props.students.filter( (student) => Number(student.batchNumber) === batch)
      .map( (student) => ({
        ...student,
        color: this.findLatestEval(student)
      }))
    const luckyStudent = this.returnLuckyStudent(students)
    if( luckyStudent === "Error"){
      this.setState({randomStudent: 0})
      return
    }
    this.setState({randomStudent: luckyStudent.id})
  }

  findLatestEval = (student) => {
    const evaluations = this.props.evaluations.filter( (evaluation) => evaluation.studentId === student.id)
    if(evaluations.length > 0) return evaluations[0].color
    return "None"
  }

  generateColor = (noReds, noAmbers, noGreens) => {
    if( noReds + noAmbers + noGreens < 1) return "Error"
    let reds = 53
    let ambers = 28
    let greens = 19
    if (noReds === 0) reds = 0
    if (noAmbers === 0) ambers = 0
    if (noGreens === 0) greens = 0

    const randomNo = Math.floor(Math.random() * (reds + ambers + greens))
    if (randomNo <= reds ) return "red"
    if (randomNo <= (reds + ambers) ) return "amber"
    else return "green"
  }

  returnLuckyStudent = (students) => {
    const luckyColor = this.generateColor(
        students.filter( (student) => student.color === "red").length,
        students.filter( (student) => student.color === "amber").length,
        students.filter( (student) => student.color === "green").length
    )
    if(luckyColor === "Error") return "Error"
    const eligibleStudents = students.filter( (student) => student.color === luckyColor)
    return eligibleStudents[Math.floor(Math.random()*eligibleStudents.length)]
  }

  returnOnClick = () => {
    const {history, currentBatch} = this.props
    history.push(`/batches/${currentBatch}`)
  }

  render() {
    const {evaluations, students, authenticated} = this.props
    const {randomStudent} = this.state

    if (!authenticated) return <Redirect to="/login" />

    if (students === null || evaluations === null) return 'Loading...'

    if (this.state.randomStudent === -1){
      this.generateRandomStudent()
      return "Loading..."
    }

    if (this.state.randomStudent === 0) return (
      <div>
        <p>No students available</p>
        <Button onClick={ () => this.returnOnClick()} label="Return">Return</Button>
      </div>
    )

    const studentToDisplay = students.filter((student) => student.id === randomStudent)[0]

    return (
      <div>
        {studentToDisplay.studentName} <br/>
        <img src={studentToDisplay.studentPicture} alt="" height="120" /><br/>
        <Button onClick={ () => this.returnOnClick()} label="Return">Return</Button><br/>
        <Button onClick={ () => this.generateRandomStudent()} label="Next">Next</Button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  currentBatch: props.match.params.id,
  students: state.students === null ?
    null : Object.values(state.students),
  evaluations: state.evaluations === null ?
    null : Object.values(state.evaluations)
})

const mapDispatchToProps = {
  getStudents, editStudent, getEvaluations
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomStudent)
