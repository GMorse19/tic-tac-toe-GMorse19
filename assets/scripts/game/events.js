'use strict'
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const onCreateGame = function (event) {
  event.preventDefault()
  $('.show-gameBoard').show()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
  $('.box').text('')
  store.turn = 'X'
}

const switchPlayer = function () {
  if (store.turn === 'X') {
    store.turn = 'O'
  } else if (store.turn === 'O') {
    store.turn = 'X'
  }
}

const onUpdate = function (event) {
  event.preventDefault()
  if (store.game.over === false) {
    if ($(event.target).text() !== '') {
      return ui.invalidMove()
    } else if ($(event.target).text() === '') {
      $(event.target).text(store.turn)
    }
    const index = $(event.target).attr('data-index')
    const value = store.turn
    api.update(index, value)
      .then(ui.onUpdateSuccess)
      .catch(ui.onUpdateFailure)
  } else {
    ui.invalidMove()
  }
  switchPlayer()
}

module.exports = {
  onCreateGame,
  onUpdate
}
