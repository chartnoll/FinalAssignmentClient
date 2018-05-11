import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import red from '../../images/red.png'
import amber from '../../images/amber.png'
import green from '../../images/green.png'

export default class EvaluationCard extends PureComponent {

  renderRating = (color) => {
    if( color === "red") return <img src={red} alt="" height="40" />
    if( color === "amber") return <img src={amber} alt="" height="40" />
    return <img src={green} alt="" height="40" />
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
        className="evaluation-card"
        width="120">
      <CardHeader
        title={evaluation.date}
      />
      <CardMedia>
        {this.renderRating(evaluation.color)}
      </CardMedia>
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
