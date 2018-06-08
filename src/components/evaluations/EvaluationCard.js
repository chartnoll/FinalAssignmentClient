import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardHeader} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import red from '../../images/red.png'
import amber from '../../images/amber.png'
import green from '../../images/green.png'
import Avatar from 'material-ui/Avatar'

export default class EvaluationCard extends PureComponent {

  renderRating = (color) => {
    if( color === "red") return red
    if( color === "amber") return amber
    return green
  }

  editOnClick = (evalId) => {
    console.log("Edit this evaluation", evalId)
  }

  deleteOnClick = (evalId) => {
    console.log("Delete this evaluation", evalId)
  }

  render() {
    const {evaluation} = this.props
    return (
      <Card
        key={evaluation.id}
        width="120">
        <CardHeader
          title={evaluation.date}
          avatar={<Avatar src={this.renderRating(evaluation.color)}/>}
        />
      <Typography color="textPrimary">
        Remark: {evaluation.remark}
      </Typography>
      <CardActions>
        <Button onClick={ () => this.editOnClick(evaluation.id)} label="Edit">Edit</Button>
        <Button onClick={ () => this.deleteOnClick(evaluation.id)} label="Delete">Delete</Button>
      </CardActions>
      </Card>
    )
  }
}
