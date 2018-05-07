import React, {PureComponent} from 'react'
import {getBatches, createGame} from '../../actions/batches'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
// import './GamesList.css'

const games = [1, 2, 3]

class DisplayBatches extends PureComponent {
  // componentWillMount() {
  //   if (this.props.authenticated) {
  //     if (this.props.games === null) this.props.getGames()
  //     if (this.props.users === null) this.props.getUsers()
  //   }
  // }

  renderGame = (game) => {
    // const {users, history} = this.props

    //key={game.id}
    return (<Card className="game-card">
      <CardContent>
        <Typography color="textSecondary">
          Just some random text
        </Typography>
      </CardContent>
    </Card>)
  }


  // return (<Card className="game-card">
  //   <CardContent>
  //     <Typography color="textSecondary">
  //     Just some random text
  //       This game is played by&nbsp;
  //       {
  //         game.players
  //           .map(player => users[player.userId].firstName)
  //           .join(' and ')
  //       }
  //     </Typography>
  //     <Typography variant="headline" component="h2">
  //       Game #{game.id}
  //     </Typography>
  //     <Typography color="textSecondary">
  //       Status: {game.status}
  //     </Typography>
  //   </CardContent>
  //   <CardActions>
  //     <Button
  //       size="small"
  //       onClick={() => history.push(`/games/${game.id}`)}
  //     >
  //       Watch
  //     </Button>
  //   </CardActions>
  // </Card>)


  render() {
    // const {games, users, authenticated, createGame} = this.props

    // if (!authenticated) return (
		// 	<Redirect to="/login" />
		// )
    //
    // if (games === null || users === null) return null

    return (<Paper className="outer-paper">
      <Button
        color="primary"
        variant="raised"
        className="create-game"
      >
        Edit and Create Batches
      </Button>

      <div>
        {games.map(game => this.renderGame(game))}
      </div>
    </Paper>)
  }
}

//onClick={createBatch}

// const mapStateToProps = state => ({
//   authenticated: state.currentUser !== null,
//   users: state.users === null ? null : state.users,
//   games: state.games === null ?
//     null : Object.values(state.games).sort((a, b) => b.id - a.id)
// })

// export default DisplayBatches

export default connect(null, {getBatches})(DisplayBatches)
