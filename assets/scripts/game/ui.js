'use strict'

const store = require('../store')

const successMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
}

const numberOfGamesMessage = function (newText) {
  $('#game-count').text(newText)
  $('#game-count').removeClass('success')
  $('#game-count').addClass('failure')
}

// const failureMessage2 = function (newText) {
//   $('#message2').text(newText)
//   $('#message2').removeClass('success')
//   $('#message2').addClass('failure')
// }
let numberOfGames = 0

const onCreateGameSuccess = function (responseData) {
  numberOfGames += 1
  store.count = numberOfGames
  console.log('games: ' + store.count)
  numberOfGamesMessage(store.count)
  successMessage("Player X's move")
  console.log('onCreateGameSuccess data ' + responseData)
  store.game = responseData.game
  console.log(store.game)
}

const onCreateGameFailure = function () {
  failureMessage('⚠️ABORT! ABORT!⚠️')
  console.log('onCreateGameFailure')
}

let playerMoves = 0
let playerTurn = 0
// const checkFull = function () {
//   for (let i = 0; i < store.game.cells; i++) {
//     if (store.game.cells[i] === '') {
//       return false
//     }
//   }
//   return true
// }

const onUpdateSuccess = function (responseData) {
  playerTurn += 1
  if (playerTurn % 2 === 0) {
    successMessage("Player X's move")
  } else {
    successMessage("Player O's move")
  }
  // console.log('onUpdateSuccess data ' + responseData)
  store.game = responseData.game
  console.log(store.game.cells)
  const checkWin = function () {
    playerMoves += 1
    if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[1] && store.game.cells[1] === store.game.cells[2]) {
      endGame()
      console.log('SubArray 012 Won!')
    } else if (store.game.cells[3] !== '' && store.game.cells[3] === store.game.cells[4] && store.game.cells[4] === store.game.cells[5]) {
      endGame()
      console.log('Sub Array 345 Won!')
    } else if (store.game.cells[6] !== '' && store.game.cells[6] === store.game.cells[7] && store.game.cells[7] === store.game.cells[8]) {
      endGame()
      console.log('Sub Array 678 Won!')
    } else if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[3] && store.game.cells[3] === store.game.cells[6]) {
      endGame()
      console.log('Sub Array 036 Won!')
    } else if (store.game.cells[1] !== '' && store.game.cells[1] === store.game.cells[4] && store.game.cells[4] === store.game.cells[7]) {
      endGame()
      console.log('Sub Array 147 Won!')
    } else if (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[5] && store.game.cells[5] === store.game.cells[8]) {
      endGame()
      console.log('Sub Array 258 Won!')
    } else if (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[4] && store.game.cells[4] === store.game.cells[6]) {
      endGame()
      console.log('Sub Array 246 Won!')
    } else if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[4] && store.game.cells[4] === store.game.cells[8]) {
      endGame()
      console.log('Sub Array 048 Won!')
    } else if (playerMoves === 9) {
      console.log('TIE!!!!!!!')
      endGame()
    }
  }
  checkWin()
}

const endGame = function () {
  console.log('Game Over!')
  store.game.over = true
  console.log(store.game.over)
}

const onUpdateFailure = function () {
  failureMessage('Bad Update ⚠️ABORT! ABORT!⚠️')
  console.log('onUpdateFailure')
}

const invalidMove = function () {
  failureMessage('Invalid Move!!')
}

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateSuccess,
  onUpdateFailure,
  invalidMove,
  numberOfGamesMessage
}
