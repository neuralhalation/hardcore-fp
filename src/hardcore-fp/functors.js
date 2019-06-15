/**
 * An object or data structure you can map over.
 */

/**
 * the 'maybe' functor
 * - captures a null check
 * - the value inside may not be there
 * - sometimes has two subclasses, 'just'/'nothing'
 * - sometimes called 'option' with subclasses
 *   'some'/'none'
 */
const _ = require('ramda')

const _identity = function(val) {
  this.val = val
}

const identity = function(x) {
  return new _identity(x)
}

_identity.prototype.map = function(f) {
  return identity(f(this.val))
}

const _maybe = function(val) {
  this.val = val
}

const maybe = function(x) {
  return new _maybe(x)
}

_maybe.prototype.map = function(f) {
  return this.val ? maybe(f(this.val)) : maybe(null)
}

/**
 * Exercise 1
 * Use _.add(x, y) and map(f, x) to make a function that increments
 * a value inside a functor.
 */

const exercise1 = _.map(_.add(1))

console.log(exercise1(identity(2)))

/**
 * Exercise 2
 * Use _.head to get the first element of the list
 */

const xs = identity(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

const exercise2 = _.map(_.head)

console.log(exercise2(xs))

/**
 * Excercise 3
 * use safeGet and _.head to find the first initial of the user
 */

const safeGet = _.curry(function(x, o) {
  return maybe(o[x])
})
const user = { id: 2, name: 'Albert' }
const exercise3 = _.compose(
  _.map(_.head),
  safeGet('name')
)
console.log(exercise3(user))

/**
 * Exercise 4
 * use 'maybe' to rewrite ex4 w/o an if statement
 */

const oldEx4 = function(n) {
  if (n) {
    return parseInt(n)
  }
}

const newEx4 = _.curry(function(n) {
  return maybe(parseInt(n))
})
const solution = _.compose(
  _.map(parseInt),
  maybe
)
console.log(newEx4('4'))
console.log(solution('4'))
