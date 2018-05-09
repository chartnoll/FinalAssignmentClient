import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Typography from 'material-ui/Typography'

export default class EvaluationCard extends PureComponent {

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
        title={evaluation.color}
      />
      <Typography variant="headline" component="h2">
        Date: {evaluation.date}
      </Typography>
      <Typography color="textSecondary">
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
