import React, {PureComponent} from 'react'
import {editStudent} from '../../actions/students'
import {connect} from 'react-redux'

class StudentEditor extends PureComponent {
	state = {}

	editOnClick = (e) => {
		const updates = this.state
		e.preventDefault()
		let payload = {}
		if( Object.keys(updates).includes("studentName") ) payload.studentName = updates.studentName
		if( Object.keys(updates).includes("studentPicture") ) payload.studentPicture = updates.studentPicture
		if( Object.keys(updates).includes("batchNumber") ) payload.batchNumber = updates.batchNumber
		payload.studentId = this.props.currentStudentID
		this.props.toggleEditor()
		this.props.editStudent(payload)
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
			<form onSubmit={this.editOnClick}>
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

export default connect (null, {editStudent})(StudentEditor)
