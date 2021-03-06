import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {createBatch} from '../../actions/batches'

class BatchForm extends PureComponent {
	state = {
		startDate: new Date().toISOString().slice(0,10)
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.createBatch(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="batchNumber">Batch Number</label>
					<input type="number" name="batchNumber" id="batchNumber" value={
						this.state.batchNumber || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="startDate">Start Date</label>
					<input type="date" name="startDate" id="startDate" value={
						this.state.startDate
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="endDate">End Date</label>
					<input type="date" name="endDate" id="endDate" value={
						this.state.endDate || ''
					} onChange={ this.handleChange } />
				</div>
				<br/>

        <button type="submit">Save Batch</button>
			</form>
		)
	}
}

export default connect(null, {createBatch})(BatchForm)
