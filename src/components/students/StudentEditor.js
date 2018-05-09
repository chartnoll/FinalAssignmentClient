import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'

export default class StudentEditor extends PureComponent {
	state = {}

	handleSubmit = (e) => {
    e.preventDefault()
		this.props.editOnClick(this.state)
    this.setState({})
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
					<label htmlFor="studentName">Name</label>
					<input type="text" name="studentName" id="studentName" value={
						this.state.studentName || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="studentPicture">Picture</label>
					<input type="url" name="studentPicture" id="studentPicture" value={
						this.state.studentPicture || ''
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="batchNumber">BatchNumber</label>
					<input type="number" name="batchNumber" id="batchNumber" value={
						this.state.batchNumber || ''
					} onChange={ this.handleChange } />
				</div>

        <button type="submit">Save Changes</button>
			</form>
		)
	}
}
