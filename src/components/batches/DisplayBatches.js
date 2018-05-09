import React, {PureComponent} from 'react'
import {getBatches, createBatch} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import BatchCard from './BatchCard'
// import './GamesList.css'

class DisplayBatches extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batches === null) this.props.getBatches()
    }
  }

  createNewBatch = () => {
    var newBatchNumber = prompt("Please enter the new batch number")
    var startDate = prompt("Please enter the new batch start date")
    var endDate = prompt("Please enter the new batch end date")
    var newBatch = {newBatchNumber, startDate, endDate}
    console.log("Creating batch number", newBatch)
    this.props.createBatch(newBatch)
  }

  render() {
    const {batches, authenticated, createBatch} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if( batches === null) return null

    return (<Paper className="outer-paper">
      <Button
        color="primary"
        variant="raised"
        onClick={this.createNewBatch}
        className="create-game"
      >
        Create a new batch
      </Button>

      <div>
        Some stuff
        {batches.map(batch =>  <BatchCard
          batch={batch} history={this.props.history}/>)}
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  batches: state.batches === null ?
    null : Object.values(state.batches)
})


export default connect(mapStateToProps, {getBatches, createBatch})(DisplayBatches)
