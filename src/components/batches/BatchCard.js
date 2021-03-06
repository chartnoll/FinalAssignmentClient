import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

export default class BatchCard extends PureComponent {

  render() {
    const {batch, history} = this.props
    return (
      <Card className="batch-card">
        <CardContent>
          <Typography color="textPrimary">
            <b>Batch number&nbsp;
            {batch.batchNumber}</b>
          </Typography>
          <Typography>
            Start date&nbsp;
            {batch.startDate}
          </Typography>
          <Typography>
            End date&nbsp;
            {batch.endDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => history.push(`/batches/${batch.id}`)}
            >
              View
            </Button>
        </CardActions>
      </Card>)
  }
}
