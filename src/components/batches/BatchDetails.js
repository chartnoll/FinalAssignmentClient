import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getBatches, createBatch} from '../../actions/batches'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const students = [1,2,3,4]

class BatchDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batch === null) this.props.getBatches()
    }
  }

  renderStudent = (student) => {
    const {history} = this.props

    return (<Card className="game-card">
      <CardContent>
        <Typography color="textSecondary">
          Batch number&nbsp;
          {students}
        </Typography>
      </CardContent>
    </Card>)
  }

  render() {
    const {batch, authenticated, userId} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (batch === null) return 'Loading...'
    if (!batch) return 'Not found'

    return (<Paper className="outer-paper">
      <h1>Batch # {batch.batchNumber}</h1>

      <p>Start date: {batch.startDate}</p>
      <p>End date: {batch.endDate}</p>

      <div>
        Each student
        {students.map(student => this.renderStudent(student))}
      </div>
    </Paper>)
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  batch: state.batches && state.batches[props.match.params.id],
})

// state.batches.find(b => b.batchNumber === props.match.params.id)

const mapDispatchToProps = {
  getBatches, createBatch
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails)
