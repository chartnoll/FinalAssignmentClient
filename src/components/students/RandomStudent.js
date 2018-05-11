import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import Chip from 'material-ui/Chip'
import Typography from 'material-ui/Typography'
import {getRandomStudent} from '../../actions/students'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class RandomStudent extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.randomStudent === null) this.props.getRandomStudent(this.props.match.params.id)
    }
  }

  returnOnClick = () => {
    const {history, currentBatch} = this.props
    history.push(`/batches/${currentBatch}`)
  }

  nextOnClick = () => {
    this.reset()
  }

  render() {
    const {randomStudent, history, currentBatch, authenticated} = this.props

    if (!authenticated) return <Redirect to="/login" />

    if (randomStudent === null) return 'Loading...'
    if (!randomStudent) return 'Not found'


    return (
      <div>
        {randomStudent.studentName} <br/>
        <img src={randomStudent.studentPicture} alt="" height="120" /><br/>
        <Button onClick={this.returnOnClick} label="Return">Return</Button><br/>
        <Button onClick={this.nextOnClick} label="Next">Next</Button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  // userId: state.currentUser && userId(state.currentUser.jwt),
  currentBatch: props.match.params.id,
  randomStudent: state.randomStudent
})

const mapDispatchToProps = {
  getRandomStudent
}

export default connect(mapStateToProps, mapDispatchToProps)(RandomStudent)
