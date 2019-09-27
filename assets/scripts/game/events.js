'use strict'
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields.js')
const api = require('./api')
const ui = require('./ui')

const onCreateGame = function (event) {
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
  $('.box').text('')
}

const switchPlayer = function () {
  if (store.turn === 'X') {
    store.turn = 'O'
  } else {
    store.turn = 'X'
  }
  // playerTurn()
}

// const playerTurn = function () {
//   store.turn += 1
//   // need to make store.turn = 0 when new game begins
//   if (store.turn === 9) {
//     store.turn = 0
//   }
// }

const onUpdate = function (event) {
  event.preventDefault()
  const index = $(event.target).attr('data-index')
  const value = store.turn
  console.log('onUpdate worked!')
  if ($(event.target).html() === '') {
    $(event.target).html(store.turn)
    switchPlayer()
  } else {
    ui.invalidMove()
  }
  api.update(index, value)
    .then(ui.onUpdateSuccess)
    .catch(ui.onUpdateFailure)
}

// const checkWin = function () {
//   if (store.game.cells === 'X') {
//     console.log('X is TRUE')
//   }
// }

module.exports = {
  onCreateGame,
  onUpdate
}
