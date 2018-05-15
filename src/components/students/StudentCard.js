import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardHeader, CardTitle, CardText, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import {updateStatus} from '../../actions/status'
import {getStudents, deleteStudent} from '../../actions/students'
import Avatar from 'material-ui/Avatar'
import StudentEditor from './StudentEditor'
import EvaluationChip from './EvaluationChip'
import Grid from 'material-ui/Grid'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class StudentCard extends PureComponent {
  state = {
    editToggle : false
  }

  toggleEditor = () => {
    const newValue = this.state.editToggle === true ?
      false : true
    this.setState({editToggle: newValue})
  }

  evaluateOnClick = (studentId) => {
    const {history, currentBatch} = this.props
    this.props.updateStatus({studentId, currentBatch})
    history.push(`/students/${studentId}`)
  }

  deleteOnClick = (studentId) => {
    this.props.deleteStudent(studentId, this.props.students)
    this.props.getStudents(this.props.currentBatch)
  }

  render() {
    const {student, evaluations, index} = this.props
    return (
      <Grid item xs={16} sm={6} key={index}>
      <Card
        key={student.id}
        className="student-card"
        width="120">
      <CardHeader
        title={student.studentName}
        avatar={<Avatar src={student.studentPicture}/>}
      />
      <CardMedia>
        <img src={student.studentPicture} alt="" height="120" />
      </CardMedia>
      <CardActions>
        <Button onClick={ () => this.evaluateOnClick(student.id)} label="Evaluate">Evaluate</Button>
        <Button onClick={ () => this.toggleEditor()} label="Edit">Edit</Button>
        <Button onClick={ () => this.deleteOnClick(student.id)} label="Delete">Delete</Button>
    </CardActions>
    <Typography variant="headline" component="h2">
      { this.state.editToggle === true &&
        <StudentEditor
          currentStudentID={student.id}
          toggleEditor={this.toggleEditor}/>}
      { evaluations.map((evaluation) => {if(evaluation.id === student.id)
        return <EvaluationChip evaluation={evaluation}/>} )}
    </Typography>
    </Card>
    </Grid>
    )
  }
}

const mapStateToProps = (state, props) => ({
  evaluations: state.evaluations === null ?
    null : Object.values(state.evaluations)
})

const mapDispatchToProps = {
  getStudents, deleteStudent, updateStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentCard)
