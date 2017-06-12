// https://api.spotify.com/v1/search?q=muse&type=artist : artists: {items: []}
// https://api.spotify.com/v1/artists/${id}/related-artists : artists: []

const request = require('request')
const Task = require('data.task')
const Either = require('data.either')
const token = require('../../../../config/config')

const httpGet = url =>
  new Task((rej, res) =>
    request({ url,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`}
    }, (err, response, body) =>
    err ? rej(err) : res(body)))

const first = xs => Either.fromNullable(xs[0])

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

const findArtist = name =>
  httpGet(`https://api.spotify.com/v1/search?q=${name}&type=artist`)
    .map(result => result.artists.items)
    .map(first)
    .chain(eitherToTask)

const relatedArtists = id =>
  httpGet(`https://api.spotify.com/v1/artists/${id}related-artists`)
    .map(result => result.artists)
    .map(first)
    .chain(eitherToTask)

module.exports = {
  findArtist,
  relatedArtists
}
