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
  store.turn = 'X'
}
// This function needs to reference html
const switchPlayer = function () {
  if (store.turn === 'X') {
    store.turn = 'O'
  } else if (store.turn === 'O') {
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
  if (store.game.over === false) {
    const index = $(event.target).attr('data-index')
    const value = store.turn
    console.log('onUpdate store.turn= ' + store.turn)
    if ($(event.target).text() !== '') {
      ui.invalidMove()
    } else if ($(event.target).text() === '') {
      $(event.target).text(store.turn)
      console.log('store.turn= ' + store.turn)
      switchPlayer()
    }
    api.update(index, value)
      .then(ui.onUpdateSuccess)
      .catch(ui.onUpdateFailure)
  } else {
    ui.invalidMove()
  }
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
