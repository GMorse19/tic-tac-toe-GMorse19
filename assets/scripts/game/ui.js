'use strict'

const store = require('../store')

const successMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('form').trigger('reset')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
}

const onCreateGameSuccess = function (responseData) {
  successMessage('Big X!')
  console.log('win' + responseData)
  store.game = responseData.game
}

const onCreateGameFailure = function () {
  failureMessage('⚠️ABORT! ABORT!⚠️')
  console.log('lose')
}

const onUpdateSuccess = function (responseData) {
  successMessage('Big X!')
  console.log('win' + responseData)
}

const onUpdateFailure = function () {
  failureMessage('⚠️ABORT! ABORT!⚠️')
  console.log('lose')
}

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateSuccess,
  onUpdateFailure
}
