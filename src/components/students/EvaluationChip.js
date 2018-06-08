import React, {PureComponent} from 'react'
import Card, { CardHeader} from 'material-ui/Card'
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
