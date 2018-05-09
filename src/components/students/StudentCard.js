import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardHeader, CardTitle, CardText, CardMedia} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import StudentEditor from './StudentEditor'

export default class LoginForm extends PureComponent {
  state = {
    editToggle : false
  }

  editOnClick = (updates) => {
    let payload = {}
    if( Object.keys(updates).includes("studentName") ) payload.studentName = updates.studentName
    if( Object.keys(updates).includes("studentPicture") ) payload.studentPicture = updates.studentPicture
    if( Object.keys(updates).includes("batchNumber") ) payload.batchNumber = updates.batchNumber
    payload.studentId = this.props.student.id
    this.toggleEditor()
    console.log("Inside the displaystudents", payload)
    this.props.editStudent(payload)
  }

  toggleEditor = () => {
    const newValue = this.state.editToggle === true ?
      false : true
    this.setState({editToggle: newValue})
  }

  render() {
    const {student} = this.props
    return (
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
        <Button onClick={ () => this.props.evaluateOnClick(student.id)} label="Evaluate">Evaluate</Button>
        <Button onClick={ () => this.toggleEditor()} label="Edit">Edit</Button>
        <Button onClick={ () => this.props.deleteOnClick(student.id)} label="Delete">Delete</Button>
    </CardActions>
    <Typography variant="headline" component="h2">
      { this.state.editToggle === true &&
        <StudentEditor
          currentStudentID={student.id}
          editOnClick={this.editOnClick}/>}
    </Typography>
    </Card>
    )
  }
}
