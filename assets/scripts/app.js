'use strict'

const authEvents = require('./auth/events.js')
const gameEvents = require('./game/events.js')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('.show-signOut').hide()
  $('.show-gameBoard').hide()
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#new-game').on('click', gameEvents.onCreateGame)
  $('.box').on('click', gameEvents.onUpdate)
  $('.counter').on('click', gameEvents.onGetGame)
})
