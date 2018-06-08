import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardHeader, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import {getStudents, deleteStudent} from '../../actions/students'
import Avatar from 'material-ui/Avatar'
import StudentEditor from './StudentEditor'
import EvaluationChip from './EvaluationChip'
import Grid from 'material-ui/Grid'
import {connect} from 'react-redux'

class StudentCard extends PureComponent {
  state = {
    editToggle : false
  }

  toggleEditor = () => {
    const newValue = this.state.editToggle === true ?
      false : true
    this.setState({editToggle: newValue})
  }

  deleteOnClick = (studentId) => {
    this.props.deleteStudent(studentId, this.props.students)
  }

  displayLastEval = () => {
    const {student, evaluations} = this.props
    const evals = evaluations.filter((evaluation) => evaluation.studentId === student.id)
    if( evals.length > 0) return <EvaluationChip evaluation={evals[0]}/>
  }

  render() {
    const {student, index, history} = this.props
    return (
      <Grid item xs={12} sm={6} key={index}>
      <Card
        key={student.id}
        className="student-card"
        width="120">
      <CardHeader
        title={student.studentName}
        avatar={<Avatar src={student.studentPicture}/>}
      />
      <CardMedia
        className='stu_photo'
        title='photo'
        image={student.studentPicture}
        style={{height: 120, paddingTop: '70%'}}
      />
      <CardActions>
        <Button onClick={ () => history.push(`/students/${student.id}`)} label="Evaluate">Evaluate</Button>
        <Button onClick={ () => this.toggleEditor()} label="Edit">Edit</Button>
        <Button onClick={ () => this.deleteOnClick(student.id)} label="Delete">Delete</Button>
    </CardActions>
    <Typography variant="headline" component="h2">
      { this.state.editToggle === true &&
        <StudentEditor
          currentStudentID={student.id}
          toggleEditor={this.toggleEditor}/>}
      { this.displayLastEval() }
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
  getStudents, deleteStudent
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentCard)
