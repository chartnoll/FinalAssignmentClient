import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../../actions/games'
import {userId} from '../../jwt'
import Paper from 'material-ui/Paper'
// import Board from './Board'

class BatchDetails extends PureComponent {

  // componentWillMount() {
  //   if (this.props.authenticated) {
  //     if (this.props.game === null) this.props.getGames()
  //     if (this.props.users === null) this.props.getUsers()
  //   }
  // }

  // joinGame = () => this.props.joinGame(this.props.game.id)

  // makeMove = (toRow, toCell) => {
  //   const {game, updateGame} = this.props
  //
  //   const board = game.board.map(
  //     (row, rowIndex) => row.map((cell, cellIndex) => {
  //       if (rowIndex === toRow && cellIndex === toCell) return game.turn
  //       else return cell
  //     })
  //   )
  //   updateGame(game.id, board)
  // }



  render() {
    // const {game, users, authenticated, userId} = this.props

    // if (!authenticated) return (
		// 	<Redirect to="/login" />
		// )
    //
    // if (game === null || users === null) return 'Loading...'
    // if (!game) return 'Not found'
    //
    // const player = game.players.find(p => p.userId === userId)
    //
    // const winner = game.players
    //   .filter(p => p.symbol === game.winner)
    //   .map(p => p.userId)[0]

    return (<Paper className="outer-paper">
      <h1>Game #</h1>

      <p>Status:</p>
    </Paper>)
  }
}

// const mapStateToProps = (state, props) => ({
//   authenticated: state.currentUser !== null,
//   userId: state.currentUser && userId(state.currentUser.jwt),
//   game: state.games && state.games[props.match.params.id],
//   users: state.users
// })
//
// const mapDispatchToProps = {
//   getGames, getUsers, joinGame, updateGame
// }

export default BatchDetails

//export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails)
