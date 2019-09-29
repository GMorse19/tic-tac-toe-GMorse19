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
  $('#counter').show()
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

const onCreateGameSuccess = function (responseData) {
  playerMoves = 0
  playerTurn = 0
  numberOfGames += 1
  store.count = numberOfGames
  successMessage("Player X's move")
  store.game = responseData.game
  store.games = responseData.games
  numberOfGamesMessage('This Tic-Tac-Toe game has been played ' + store.game.id + ' times.')
}

const onCreateGameFailure = function () {
  failureMessage('⚠️ABORT! A new game was not created! ABORT!⚠️')
}

const onUpdateSuccess = function (responseData) {
  playerTurn += 1
  if (playerTurn % 2 === 0) {
    successMessage("Player X's move")
  } else {
    successMessage("Player O's move")
  }

  store.game = responseData.game
  const checkWin = function () {
    playerMoves += 1
    if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[1] && store.game.cells[1] === store.game.cells[2]) {
      gameOver = true
      endGame()
    } else if (store.game.cells[3] !== '' && store.game.cells[3] === store.game.cells[4] && store.game.cells[4] === store.game.cells[5]) {
      gameOver = true
      endGame()
    } else if (store.game.cells[6] !== '' && store.game.cells[6] === store.game.cells[7] && store.game.cells[7] === store.game.cells[8]) {
      gameOver = true
      endGame()
    } else if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[3] && store.game.cells[3] === store.game.cells[6]) {
      gameOver = true
      endGame()
    } else if (store.game.cells[1] !== '' && store.game.cells[1] === store.game.cells[4] && store.game.cells[4] === store.game.cells[7]) {
      gameOver = true
      endGame()
    } else if (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[5] && store.game.cells[5] === store.game.cells[8]) {
      gameOver = true
      endGame()
    } else if (store.game.cells[2] !== '' && store.game.cells[2] === store.game.cells[4] && store.game.cells[4] === store.game.cells[6]) {
      gameOver = true
      endGame()
    } else if (store.game.cells[0] !== '' && store.game.cells[0] === store.game.cells[4] && store.game.cells[4] === store.game.cells[8]) {
      gameOver = true
      endGame()
    } else if (playerMoves === 9) {
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
  } else if (playerMoves % 2 === 0) {
    successMessage('Player O wins!')
  }
  store.game.over = true
}

const onUpdateFailure = function () {
  failureMessage('Bad Update ⚠️ABORT! ABORT!⚠️')
}

const invalidMove = function () {
  failureMessage('Invalid Move!!')
}

const onGetGameSuccess = function (responseData) {
  onGetSuccessMessage(store.game.player_x.email + ' you have played ' + responseData.games.length + ' games.')
}

const onGetGameFailure = function () {
  onGetFailureMessage('GET Game failure! ⚠️ABORT!⚠️')
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
