/*
 * An object or data structure you can map over.
 */

/*
 * the 'maybe' functor
 * - captures a null check
 * - the value inside may not be there
 * - sometimes has two subclasses, 'just'/'nothing'
 * - sometimes called 'option' with subclasses
 *   'some'/'none'
 */
const _ = require('ramda')
const F = require('fantasy-land')
const S = require('sanctuary')
const IO = require('fantasy-io')

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

/*
 * Exercise 1
 * Use _.add(x, y) and map(f, x) to make a function that increments
 * a value inside a functor.
 */

const exercise1 = _.map(_.add(1))

console.log(exercise1(identity(2)))

/*
 * Exercise 2
 * Use _.head to get the first element of the list
 */

const xs = identity(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])

const exercise2 = _.map(_.head)

console.log(exercise2(xs))

/*
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

/*
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

/*
 * either
 * - typically used for pure error handling
 * - like maybe, but with an error message embeded
 * - has two subclasses: left/right
 * - maps the function over a right, ignores the left
 */

const _either = function(val) {
  this.val = val
}

const either = function(x) {
  return new _either(x)
}

_either.prototype.map = function(f) {
  return this.val ? either(f(this.val)) : either('Could not determine value.')
}

const increment = _.compose(
  _.map(_.add(1)),
  either
)
console.log(increment(1))
console.log(increment(null))

/*
 * IO
 * - a lazy computation 'builder'
 * - typically used to contain side effects
 * - you must 'runIO' to perform the operation
 * - map appends the function to a list of things to
 *   run with the effectful value
 */

/*
 * Exercise 1
 * write a function that uses checkActive() and
 * showWelcome() to grant access or return the error.
 */

const showWelcome = _.compose(
  S.concat('Welcome '),
  S.prop('name')
)
const checkActive = function(user) {
  return user.active ? S.Right(user) : S.Left('Your account is not active')
}

const eitherEx1 = _.compose(
  S.map(showWelcome),
  checkActive
)
console.log(eitherEx1({ active: false, name: 'Gary' }))
console.log(eitherEx1({ active: true, name: 'Theresa' }))

/*
 * Exercise 2
  write a validation function that checks for a length > 3. It should
  return Right(x) if it is greater than 3 and Left ("you need > 3") 
  otherwise
*/

const eitherEx2 = function(x) {
  return x.length > 3 ? S.Right(x) : S.Left('You need > 3')
}

console.log(eitherEx2('fpguy99'))
console.log(eitherEx2('...'))

/*
 * Exercise 3
 use exercise 2 above and Either as a functor to save the user if 
 they are valid.
*/

const save = function(x) {
  console.log('SAVED USER!')
  return x
}

const eitherEx3 = _.compose(
  S.map(save),
  eitherEx2
)

console.log(eitherEx3('fpguy99'))
console.log(eitherEx3('duh'))

/*
- EventStream -
  * an infinite list of resutls
  * dual of array
  * its map is sometimes lazy
  * calls the mapped function each time an event happens
*/

/*
 - Future -
 * has an eventual value
 * similar to promise, but it's "lazy"
 * you must fork it to kick it off
 * it takes a function as its value
 * calls the function with its result once it's there
*/
