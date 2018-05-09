import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'

export default class LoginForm extends PureComponent {

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
      <CardActions>
        <Button onClick={ () => this.props.evaluateOnClick(student.id)} label="Evaluate">Evaluate</Button>
        <Button onClick={ () => this.props.editOnClick(student.id)} label="Edit">Edit</Button>
        <Button onClick={ () => this.props.deleteOnClick(student.id)} label="Delete">Delete</Button>
    </CardActions>
    </Card>
    )
  }
}
