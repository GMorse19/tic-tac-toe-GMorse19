'use strict'

// const getFormFields = require('../../../lib/get-form-fields.js')
const config = require('../config')
const store = require('../store')

const createGame = function () {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: '{}'
  })
}

const getGame = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/games',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// upDateGame
const update = function (index, value) {
  console.log('update works ' + index + ',' + value)
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + `/games/${store.game.id}`,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      'game': {
        'cell': {
          'index': index,
          'value': '' + value
        },
        'over': false
      }
    }
  })
}

module.exports = {
  createGame,
  update,
  getGame
}
