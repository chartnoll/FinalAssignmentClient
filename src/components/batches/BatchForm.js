import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'

export default class BatchForm extends PureComponent {
	state = {
		startDate: new Date().toISOString().slice(0,10)
	}

	handleSubmit = (e) => {
		this.props.onSubmit(this.state)
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

        <button type="submit">Save Batch</button>
			</form>
		)
	}
}
