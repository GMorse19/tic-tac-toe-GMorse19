'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
// const exampleEvents = require('./examples/events.js')
// const box1Events = require('./auth/events.js')

// use require without a reference to ensure a file is bundled
// require('./example')

// const onBoxClick = function () {
//   console.log('Hi')
// }

$(() => {
  // your JS code goes here
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#box0').on('click', authEvents.onBoxClick)
  // $('#create-example').on('submit', exampleEvents.onCreateExample)
})
