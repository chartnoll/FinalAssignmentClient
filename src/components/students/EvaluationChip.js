import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import red from '../../images/red.png'
import amber from '../../images/amber.png'
import green from '../../images/green.png'
import Avatar from 'material-ui/Avatar'

export default class EvaluationChip extends PureComponent {
  renderRating = (color) => {
    if( color === "red") return red
    if( color === "amber") return amber
    return green
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
        avatar={<Avatar src={this.renderRating(evaluation.color)}/>}
      />
      </Card>
  )
  }
}
