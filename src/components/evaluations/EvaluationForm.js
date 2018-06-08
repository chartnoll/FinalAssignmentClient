import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
import {createEvaluation} from '../../actions/evaluations'
import {connect} from 'react-redux'

class EvaluationForm extends PureComponent {
	state = {
    date: new Date().toISOString().slice(0,10)
  }

	handleSubmit = (e) => {
		e.preventDefault()
		const payload = {
      studentId: Number(this.props.currentStudent),
      teacherId: Number(this.props.userId),
      color: this.state.color,
      remark: this.state.remark,
      date: this.state.date
    }
    this.props.createEvaluation(payload)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  setColor = (newColor) => {
    this.setState({
      color: newColor
    })
  }

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
        <Button onClick={ () => this.setColor("green")} label="green">Green</Button>
        <Button onClick={ () => this.setColor("amber")} label="amber">Amber</Button>
        <Button onClick={ () => this.setColor("red")} label="red">Red</Button>
				<div>
				<br/>
					<label htmlFor="date">Date</label>
					<input type="date" name="date" id="date" value={
						this.state.date
					} onChange={ this.handleChange } />
				</div>
				<div>
					<label htmlFor="remark">Remark</label>
					<input type="text" name="remark" id="remark" value={
						this.state.remark || ''
					} onChange={ this.handleChange } />
				</div>
<br/>
        <button type="submit">Submit Evaluation</button>
			</form>
		)
	}
}

export default connect(null, {createEvaluation})(EvaluationForm)
