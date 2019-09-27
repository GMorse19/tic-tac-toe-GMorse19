'use strict'

const store = require('../store')

const successMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  $('#message').removeClass('success')
  $('#message').addClass('failure')
}

const onSignUpSuccess = function () {
  successMessage('Signed up successfully!')
}

const onSignUpFailure = function () {
  failureMessage('Sign Up Failure ⚠️ABORT! ABORT!⚠️')
}

const onSignInSuccess = function (responseData) {
  successMessage('Signed in successfully!')
  console.log('Response data is ' + responseData)
  store.user = responseData.user
  console.log('./store is ' + store)
}

const onSignInFailure = function () {
  failureMessage('Sign In Failure ⚠️RUN!!!⚠️')
}

const onChangePasswordSuccess = function () {
  successMessage('Changed Password successfully!')
}

const onChangePasswordFailure = function () {
  failureMessage('PassWord Change Failed 🔥THE END IS NIGH!!🔥')
}

const onSignOutSuccess = function () {
  successMessage('Signed out successfully!')
}

const onSignOutFailure = function () {
  failureMessage('Sign Out Failed ⚠️ABORT! ABORT!⚠️')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
