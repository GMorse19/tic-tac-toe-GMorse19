'use strict'

const store = require('../store')
const api = require('./api')
const ui = require('./ui')

const takenIndex = []

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
  let compChoice = 0
  for (let i = 0; i < compChoices.length; i++) {
    if (compChoices[i] === '') {
      choices.push(i)
    }
  }
  if (choices.length >= 9) {
    compChoice = 4
  } else {
    compChoice = choices[Math.floor(Math.random() * choices.length)]
  }
  store.compChoice = compChoice
  $(`.box[data-index=${compChoice}]`).trigger('click')
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
    takenIndex.push(index)
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

const onShowChangePassword = function () {
  $('#change-password').show()
  $('#show-changePassword').hide()
}

const onShowSignUp = function () {
  $('#sign-up').show()
  $('#show-signin').show()
  $('#show-signup').hide()
  $('.hide-signIn').hide()
  $('#sign-up-message').text('Please Sign Up')
  $('#sign-up-message').removeClass('failure')
  $('#sign-up-message').addClass('success')
}

const onShowSignIn = function () {
  $('#sign-up').hide()
  $('#show-signin').hide()
  $('#show-signup').show()
  $('.hide-signIn').show()
  $('#sign-in-message').text('Please Sign In')
  $('#sign-in-message').removeClass('failure')
  $('#sign-in-message').addClass('success')
}

module.exports = {
  onCreateGame,
  onUpdate,
  onGetGame,
  onCompMove,
  onShowChangePassword,
  onShowSignUp,
  onShowSignIn
}
