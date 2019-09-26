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
}

const onUpdate = function (event) {
  event.preventDefault()
  const index = $(event.target).attr('data-index')
  const value = store.turn
  api.update(index, value)
    .then(ui.onUpdateSuccess)
    .catch(ui.onUpdateFailure)
}

module.exports = {
  onCreateGame,
  onUpdate
}
