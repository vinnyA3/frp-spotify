const a = require('axios')
const Task = require('data.task')
const Either = require('data.eiter')

const httpGet = url =>
  new Task((rej, res) =>
    a.get(url)
      .then(data => res(data))
      .catch(err => rej(err)))

const first = xs => Either.fromNullable(xs[0])

const eitherToTask = e =>
  e.fold(Task.rejected, Task.of)

const findArtist = name =>
  httpGet(`${name}`)
    .map(result => result.artists.items)
    .map(first)
    .chain(eitherToTask)

const relatedArtists = id =>
  httpGet(`${id}`)
    .map(result => result.artists)
    .map(first)
    .chain(eitherToTask)

module.exports = {
  findArtist,
  relatedArtists
}
