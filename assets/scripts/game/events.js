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

let player = 'X'

const switchPlayer = function () {
  if (player === 'X') {
    player = 'O'
    console.log(player)
  } else {
    player = 'X'
    console.log(player)
  }
}

// const onBoxClick = function (event) {
//   event.preventDefault()
//   console.log('The event worked!')
//   if ($(event.target).text() === '') {
//     $(event.target).text(player)
//     switchPlayer()
//   } else {
//     ui.invalidMove()
//   }
// }

const onUpdate = function (event) {
  event.preventDefault()
  const index = $(event.target).attr('data-index')
  const value = store.turn
  console.log('The event worked!')
  if ($(event.target).html() === '') {
    $(event.target).html(player)
    switchPlayer()
  } else {
    ui.invalidMove()
  }
  api.update(index, value)
    .then(ui.onUpdateSuccess)
    .catch(ui.onUpdateFailure)
}

module.exports = {
  onCreateGame,
  onUpdate
  // onBoxClick
}
