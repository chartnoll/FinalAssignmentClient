import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import Typography from 'material-ui/Typography'

export default class EvaluationChip extends PureComponent {

  render() {
    const {evaluation} = this.props
    return (
      <div>
        {evaluation.color} <br/>
        Evaluated: {evaluation.date}
      </div>
    )
  }
}
