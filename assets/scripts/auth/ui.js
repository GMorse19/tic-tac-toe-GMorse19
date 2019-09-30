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
  signUpSuccessMessage('Signed up successfully!')
}

const onSignUpFailure = function () {
  $('#sign-up').trigger('reset')
  signUpFailureMessage('⚠️You failed to sign up! ⚠️')
}

const onSignInSuccess = function (responseData) {
  $('#sign-in').trigger('reset')
  $('.hide-signUp').hide()
  $('.hide-signIn').hide()
  $('.show-signOut').show()
  signUpFailureMessage('')
  store.user = responseData.user
  successMessage('You are now signed in! ' + store.user.email)
}

const onSignInFailure = function () {
  $('#sign-in').trigger('reset')
  onSignInFailureMessage('⚠️You failed to sign in! ⚠️')
}

const onChangePasswordSuccess = function () {
  $('#change-password').trigger('reset')
  successMessage('Changed Password successfully!')
}

const onChangePasswordFailure = function () {
  $('#change-password').trigger('reset')
  failureMessage('🔥🔥PassWord Change Failed 🔥🔥')
}

const onSignOutSuccess = function () {
  $('#sign-up').trigger('reset')
  $('#change-password').trigger('reset')
  signUpSuccessMessage('You have signed out. Thanks for playing!')
  $('#counter').hide()
}

const onSignOutFailure = function () {
  failureMessage('⚠️You did not sign out successfully!⚠️')
  $('#counter').hide()
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
