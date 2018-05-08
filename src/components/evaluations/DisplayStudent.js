import React, {PureComponent} from 'react'
import {getBatches, createBatch} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

class DisplayStudent extends PureComponent {
  // componentWillMount() {
  //   console.log("ComponentWillMount has fired", this.props.evaluations)
  //   if (this.props.authenticated) {
  //     if (this.props.evaluations === null) this.props.getEvaluations()
  //   }
  // }

  // createNewBatch = () => {
  //   var newBatchNumber = prompt("Please enter the new batch number")
  //   var startDate = prompt("Please enter the new batch start date")
  //   var endDate = prompt("Please enter the new batch end date")
  //   var newBatch = {newBatchNumber, startDate, endDate}
  //   console.log("Creating batch number", newBatch)
  //   this.props.createBatch(newBatch)
  // }

  // renderGame = (batch) => {
  //   const {history} = this.props
  //
  //   return (<Card className="game-card">
  //     <CardContent>
  //       <Typography color="textSecondary">
  //         Batch number&nbsp;
  //         {batch.batchNumber}
  //       </Typography>
  //       <Typography color="textSecondary">
  //         Start date&nbsp;
  //         {batch.startDate}
  //       </Typography>
  //       <Typography color="textSecondary">
  //         Start date&nbsp;
  //         {batch.endDate}
  //       </Typography>
  //     </CardContent>
  //     <CardActions>
  //       <Button
  //         size="small"
  //         onClick={() => history.push(`/batches/${batch.id}`)}
  //         >
  //           Watch
  //         </Button>
  //     </CardActions>
  //   </Card>)
  // }


  render() {
    // const {authenticated} = this.props
    //
    // if (!authenticated) return (
		// 	<Redirect to="/login" />
		// )

    // if( evaluations === null) return null

    return (
      <Paper className="outer-paper">
      <Button
        color="primary"
        variant="raised"
        className="create-game"
      >
        Create a new batch
      </Button>

      <div>
        Some stuff

      </div>
    </Paper>)
  }
}
//onClick={this.createNewBatch}
//{batches.map(batch => this.renderGame(batch))}

// const mapStateToProps = state => ({
//   authenticated: state.currentUser !== null,
//   batches: state.batches === null ?
//     null : Object.values(state.batches)
// })

export default DisplayStudent

// export default connect(mapStateToProps, {getBatches, createBatch})(DisplayBatches)
