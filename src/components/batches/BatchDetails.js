import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getBatches, createBatch} from '../../actions/batches'
import {getStudents} from '../../actions/students'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

class BatchDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batch === null) this.props.getBatches()
      if (this.props.students === null) this.props.getStudents(this.props.currentBatch)
    }
  }

  renderStudent = (student) => {
    const {history} = this.props

    return (<Card className="game-card">
      <CardContent>
        <Typography color="textSecondary">
          Batch number&nbsp;
          {student.studentName}
        </Typography>
      </CardContent>
    </Card>)
  }

  render() {
    const {batch, authenticated, userId, students} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (batch === null || students === null) return 'Loading...'
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
  currentBatch: props.match.params.id,
  students: state.students === null ?
    null : Object.values(state.students)
})

const mapDispatchToProps = {
  getBatches, createBatch, getStudents
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails)
