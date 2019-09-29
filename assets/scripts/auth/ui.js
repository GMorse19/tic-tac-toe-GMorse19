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
const signUpSuccessMessage = function (newText) {
  $('#sign-in-message').text(newText)
  $('#sign-in-message').removeClass('success')
  $('#sign-in-message').addClass('failure')
}

const signUpFailureMessage = function (newText) {
  $('#sign-in-message').text(newText)
  $('#sign-in-message').removeClass('success')
  $('#sign-in-message').addClass('failure')
}

const onSignInFailureMessage = function (newText) {
  $('#sign-in-message').text(newText)
  $('#sign-in-message').removeClass('success')
  $('#sign-in-message').addClass('failure')
}

const onSignUpSuccess = function () {
  $('#sign-up').trigger('reset')
  $('.hide-signUp').hide()
  // successMessage('Signed up successfully!')
  signUpSuccessMessage('Signed up successfully!')
}

const onSignUpFailure = function () {
  $('#sign-up').trigger('reset')
  signUpFailureMessage('Sign Up Failure ⚠️ABORT! ABORT!⚠️')
}

const onSignInSuccess = function (responseData) {
  $('#sign-in').trigger('reset')
  $('.hide-signUp').hide()
  $('.hide-signIn').hide()
  $('.show-signOut').show()
  signUpFailureMessage('')
  console.log('Response data is ' + responseData)
  store.user = responseData.user
  successMessage('You are now signed in!')
  console.log('./store is ' + store)
}

const onSignInFailure = function () {
  $('#sign-in').trigger('reset')
  onSignInFailureMessage('Sign In Failure ⚠️RUN!!!⚠️')
}

const onChangePasswordSuccess = function () {
  $('#change-password').trigger('reset')
  successMessage('Changed Password successfully!')
}

const onChangePasswordFailure = function () {
  $('#change-password').trigger('reset')
  failureMessage('PassWord Change Failed 🔥THE END IS NIGH!!🔥')
}

const onSignOutSuccess = function () {
  signUpSuccessMessage('Thanks for playing!')
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
