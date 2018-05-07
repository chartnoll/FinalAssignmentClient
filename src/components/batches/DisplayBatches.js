import React, {PureComponent} from 'react'
import {getBatches, createGame} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
// import './GamesList.css'

const games = [1, 2, 3]

class DisplayBatches extends PureComponent {
  componentWillMount() {
    console.log("ComponentWillMount has fired", this.props.batches)
    if (this.props.authenticated) {
      if (this.props.batches === null) this.props.getBatches()
    }
  }

  renderGame = (batch) => {
    const {history} = this.props

    return (<Card className="game-card">
      <CardContent>
        <Typography color="textSecondary">
          Batch number&nbsp;
          {batch.id}
        </Typography>
        <Typography color="textSecondary">
          Start date&nbsp;
          {batch.startDate}
        </Typography>
        <Typography color="textSecondary">
          Start date&nbsp;
          {batch.endDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => history.push(`/batches/${batch.id}`)}
          >
            Watch
          </Button>
      </CardActions>
    </Card>)
  }


  render() {
    const {batches, authenticated} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if( batches === null) return null

    return (<Paper className="outer-paper">
      <Button
        color="primary"
        variant="raised"
        className="create-game"
      >
        Edit and Create Batches
      </Button>

      <div>
        Some stuff
        {batches.map(batch => this.renderGame(batch))}

      </div>
    </Paper>)
  }
}
//{batches.map(game => this.renderGame(game))}
//onClick={createBatch}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  batches: state.batches === null ?
    null : Object.values(state.batches)
})


export default connect(mapStateToProps, {getBatches})(DisplayBatches)
