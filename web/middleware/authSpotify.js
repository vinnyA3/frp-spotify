'use strict'
// POST https://accounts.spotify.com/api/token
const Task = require('data.task')
const Identity = require('fantasy-identities')
const request = require('request')
const base64 = require('base-64')
const _ = require('ramda')

const httpPost = url => creds =>
  new Task((rej, res) =>
    request.post({ url,
      headers: { 'Authorization': `Basic ${creds}` },
      form: { grant_type: 'client_credentials' }
    }, (err, response, body) => err ? rej(err) : res(body)))

const credsToString = creds => _.join(':', creds)

const encode64 = creds => base64.encode(creds)

const encodeCreds = secrets =>
  Identity(secrets)
    .map(_.props(['client_id', 'client_secret']))
    .map(credsToString)
    .chain(encode64)

const getAuthToken = _.compose(
  httpPost('https://accounts.spotify.com/api/token'),
  encodeCreds
)

module.exports = {
  getAuthToken
}

