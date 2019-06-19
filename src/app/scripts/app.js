const $ = require('jquery')
const _ = require('ramda')
const P = require('pointfree-fantasy')
const Maybe = require('./maybe')
const Player = require('./player')
const io = require('./io')
const bacon = require('baconjs')
const http = require('./http')
const l = require('lodash')

io.extendFn()

// helpers

const compose = P.compose
const map = P.map
const log = function(x) {
  console.log(x)
  return x
}
const fork = _.curry(function(f, future) {
  return future.fork(log, f)
})
const setHtml = _.curry(function(sel, x) {
  return $(sel).html(x)
})
const listen = _.curry(function(event, target) {
  return bacon.fromEvent(target, event)
})
const getData = _.curry(function(name, elt) {
  return $(elt).data(name)
})
const last = function(ar) {
  return ar[ar.length - 1]
}
const getProp = _.curry(function(propertyName, element) {
  return element.prop(propertyName)
})

const apiKey = 'AIzaSyAWoa7aqds2Cx_drrrb5FPsRObFa7Dxkfg'

// PURE

/**
 * eventValue :: DomEvent -> String
 */
const eventValue = compose(
  l.get('value'),
  l.get('target')
)

/**
 * valueStream :: DomEvent -> EventStream String
 */
const valueStream = compose(
  map(eventValue),
  listen('keyup')
)

/**
 * termToUrl :: String -> URL
 * @param {string} term
 */
const termToUrl = function(term) {
  return (
    'https://www.googleapis.com/youtube/v3/search?' +
    $.param({ part: 'snippet', q: term, key: apiKey })
  )
}

/**
 * urlStream :: DomEvent -> EventStream String
 */
const urlStream = compose(
  map(termToUrl),
  valueStream
)

/**
 * getInputStream :: Selector -> IO EventStream String
 */
const getInputStream = compose(
  map(urlStream),
  $.toIO()
)

/**
 * render :: Entry -> Dom
 * @param {obj} e
 */
const render = function(e) {
  return $('<li/>', { text: e.snippet.title, 'data-youtubeid': e.id.videoId })
}

/**
 * videoEntries :: YoutubeResponse -> [Dom]
 */
const videoEntries = compose(
  map(render),
  l.get('items')
)

/**
 * search :: URL -> Future [Dom]
 */
const search = compose(
  map(videoEntries),
  http.getJSON
)

/**
 * clickStream :: DomElement -> EventStream DomElement
 */
const clickStream = compose(
  map(l.get('target')),
  listen('click')
)

/**
 * idInUrl :: URL -> String
 */
const idInUrl = compose(
  last,
  _.split('/')
)

/**
 * youtubeLink :: DomElement -> Maybe ID
 */
const youtubeLink = compose(
  map(idInUrl),
  Maybe,
  getData('youtubeid')
)

// IMPURE
getInputStream('#search')
  .runIO()
  .onValue(
    compose(
      fork(setHtml('#results')),
      search
    )
  )

clickStream(document).onValue(
  compose(
    map(
      compose(
        setHtml('#player'),
        Player.create
      )
    ),
    youtubeLink
  )
)
