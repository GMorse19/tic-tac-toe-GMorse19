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
  successMessage('Created Game!')
  console.log('onCreateGameSuccess data ' + responseData)
  store.game = responseData.game
  console.log(store.game)
}

const onCreateGameFailure = function () {
  failureMessage('⚠️ABORT! ABORT!⚠️')
  console.log('onCreateGameFailure')
}

const onUpdateSuccess = function (responseData) {
  successMessage('Updated Game!')
  console.log('onUpdateSuccess data ' + responseData)
  store.game = responseData.game
  console.log(store.game)
}

const onUpdateFailure = function () {
  failureMessage('Bad Update ⚠️ABORT! ABORT!⚠️')
  console.log('onUpdateFailure')
}

const invalidMove = function () {
  failureMessage('Invalid Move!!')
}

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateSuccess,
  onUpdateFailure,
  invalidMove
}
