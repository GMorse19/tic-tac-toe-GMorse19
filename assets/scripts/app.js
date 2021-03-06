'use strict'

const authEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp).hide()
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('.show-signOut').hide()
  $('.show-gameBoard').hide()
  $('#change-password').on('submit', authEvents.onChangePassword).hide()
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#new-game').on('click', gameEvents.onCreateGame)
  $('.box').on('click', gameEvents.onUpdate)
  $('.counter').on('click', gameEvents.onGetGame)
  $('#comp-move').on('click', gameEvents.onCompMove).hide()
  $('#show-changePassword').on('click', gameEvents.onShowChangePassword)
  $('#show-signup').on('click', gameEvents.onShowSignUp)
  $('#show-signin').on('click', gameEvents.onShowSignIn)
})
