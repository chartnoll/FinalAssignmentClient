import React, {PureComponent} from 'react'
import {getBatches} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import BatchCard from './BatchCard'
import BatchForm from './BatchForm'
import Grid from 'material-ui/Grid';

class DisplayBatches extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batches === null) this.props.getBatches()
    }
  }

  render() {
    const {batches, authenticated, createBatch} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if( batches === null) return null

    return (<Paper className="outer-paper">
      <BatchForm />
      <br/>

      <div>
        <Grid container spacing={32}>
          {batches.map(batch =>  <BatchCard
            batch={batch} history={this.props.history}/>)}
        </Grid>
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  batches: state.batches === null ?
    null : Object.values(state.batches)
})


export default connect(mapStateToProps, {getBatches})(DisplayBatches)
