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

const onCreateGameSuccess = function (responseData) {
  successMessage('Created Game!')
  console.log('onCreateGameSuccess data ' + responseData)
  store.game = responseData.game
  console.log(store.game)
}

const onCreateGameFailure = function () {
  failureMessage('⚠️ABORT! ABORT!⚠️')
  console.log('onCreateGameFailure')
}

// const winArrays = [
//   [0,1,2],[3,4,5],[6,7,8],
//   [0,3,6],[1,4,7],[2,5,8],
//   [2,4,6],[0,4,8]
// ]


const onUpdateSuccess = function (responseData) {
  successMessage('Updated Game!')
  console.log('onUpdateSuccess data ' + responseData)
  store.game = responseData.game
  console.log(store.game.cells)
  const checkWin = function () {
    // const winSubArr = [0,1,2]
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
  invalidMove
}
