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

const onGetSuccessMessage = function (newText) {
  $('#counter').text(newText)
  $('#counter').removeClass('failure')
  $('#counter').addClass('success')
}

const onGetFailureMessage = function (newText) {
  $('#counter').text(newText)
  $('#counter').removeClass('failure')
  $('#counter').addClass('success')
}

let numberOfGames = 0
let playerMoves = 0
let playerTurn = 0
let gameOver = false
let playerXwins = 0
let playerOwins = 0

const onCreateGameSuccess = function (responseData) {
  playerMoves = 0
  playerTurn = 0
  numberOfGames += 1
  store.count = numberOfGames
  console.log('games: ' + store.count)
  successMessage("Player X's move")
  console.log('onCreateGameSuccess data ' + responseData)
  store.game = responseData.game
  store.games = responseData.games
  numberOfGamesMessage('This game has been played ' + store.game.id + ' times.')
  console.log(store.games)
  console.log(store.game)
  console.log(store.game.player_x.email)
}

const onCreateGameFailure = function () {
  failureMessage('⚠️ABORT! ABORT!⚠️')
  console.log('onCreateGameFailure')
}

const onUpdateSuccess = function (responseData) {
  playerTurn += 1
  if (playerTurn % 2 === 0) {
    successMessage("Player X's move")
  } else {
    successMessage("Player O's move")
  }

  store.game = responseData.game
  console.log(store.game.id)
  console.log(store.game.cells)
  console.log(store.game.player_x.email)
  const checkWin = function () {
    playerMoves += 1
    if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[1] && store.game.cells[1] === store.game.cells[2]) {
      gameOver = true
      endGame()
      console.log('SubArray 012 Won!')
    } else if (store.game.cells[3] !== '' && store.game.cells[3] === store.game.cells[4] && store.game.cells[4] === store.game.cells[5]) {
      gameOver = true
      endGame()
      console.log('Sub Array 345 Won!')
    } else if (store.game.cells[6] !== '' && store.game.cells[6] === store.game.cells[7] && store.game.cells[7] === store.game.cells[8]) {
      gameOver = true
      endGame()
      console.log('Sub Array 678 Won!')
    } else if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[3] && store.game.cells[3] === store.game.cells[6]) {
      gameOver = true
      endGame()
      console.log('Sub Array 036 Won!')
    } else if (store.game.cells[1] !== '' && store.game.cells[1] === store.game.cells[4] && store.game.cells[4] === store.game.cells[7]) {
      gameOver = true
      endGame()
      console.log('Sub Array 147 Won!')
    } else if (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[5] && store.game.cells[5] === store.game.cells[8]) {
      gameOver = true
      endGame()
      console.log('Sub Array 258 Won!')
    } else if (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[4] && store.game.cells[4] === store.game.cells[6]) {
      gameOver = true
      endGame()
      console.log('Sub Array 246 Won!')
    } else if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[4] && store.game.cells[4] === store.game.cells[8]) {
      gameOver = true
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
  if (gameOver === false) {
    successMessage('The game is a draw!')
  } else if (playerTurn % 2 === 1) {
    successMessage('Player X wins!')
    playerXwins += 1
  } else if (playerMoves % 2 === 0) {
    successMessage('Player O wins!')
    playerOwins += 1
  }
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

const onGetGameSuccess = function (responseData) {
  onGetSuccessMessage(store.game.player_x.email + ' you have played ' + responseData.games.length + ' games.')
}

const onGetGameFailure = function () {
  onGetFailureMessage('GET ABORT!⚠️')
  console.log('onGetGameFailure')
}

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateSuccess,
  onUpdateFailure,
  invalidMove,
  numberOfGamesMessage,
  onGetGameSuccess,
  onGetGameFailure
}
