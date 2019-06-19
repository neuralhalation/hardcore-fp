const $ = require('jquery')
const _ = require('ramda')
const P = require('pointfree-fantasy')
const Maybe = require('./maybe')
const Speaker = require('./speaker')
const io = require('./io')
const bacon = require('baconjs')
const http = require('./http')

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

// pure

const eventValue = compose(
  _.prop('value'),
  _.prop('target')
)

const valueStream = compose(
  map(eventValue),
  listen('keyup')
)
