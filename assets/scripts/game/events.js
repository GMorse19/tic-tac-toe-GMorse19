'use strict'

const store = require('../store')
const api = require('./api')
const ui = require('./ui')

// const indexChoices = ["0","1","2","3","4","5","6","7","8"]
const takenIndex = []
// let openSpace = false

const onCreateGame = function (event) {
  event.preventDefault()
  $('.show-gameBoard').show()
  $('#comp-move').show()
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

const onCompMove = function (event) {
  event.preventDefault()
  const compChoices = store.game.cells
  const choices = []
  for (let i = 0; i < compChoices.length; i++) {
    if (compChoices[i] === '') {
      choices.push(i)
    }
  }
  const compChoice = choices[Math.floor(Math.random() * choices.length)]
  store.compChoice = compChoice
  console.log(compChoice)
  $(`.box[data-index=${compChoice}]`).trigger('click')
}

const onUpdate = function (event) {
  event.preventDefault()
  console.log(event.target)
  if (store.game.over === false) {
    if ($(event.target).text() !== '') {
      return ui.invalidMove()
    } else if ($(event.target).text() === '') {
      $(event.target).text(store.turn)
    }
    const index = $(event.target).attr('data-index')
    const value = store.turn
    takenIndex.push(index)
    // console.log(takenIndex)
    api.update(index, value)
      .then(ui.onUpdateSuccess)
      .catch(ui.onUpdateFailure)
  } else {
    ui.invalidGameOver()
  }
  switchPlayer()
}

const onGetGame = function (event) {
  event.preventDefault()
  api.getGame()
    .then(ui.onGetGameSuccess)
    .catch(ui.onGetGameFailure)
}

module.exports = {
  onCreateGame,
  onUpdate,
  onGetGame,
  onCompMove
}
