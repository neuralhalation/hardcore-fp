const r = require('ramda')
const a = require('./assertions')
const l = require('./log')

/** Pseudo-compose if we were to write it ourselves */

/*
function pseudoCompose(g, f) {
    return function (x) {
        return g(f(x));
    };
}
*/

/** jsbin.com/jevag/3/edit */

const get = r.curry(function(x, obj) {
  return obj[x]
})

/** Currying allows us to compose functions. */

/** Sample dataset */
const articles = [
  {
    title: 'Everything Sucks',
    url: 'http://do.wn/sucks.html',
    author: {
      name: 'Debbie Downer',
      email: 'debbie@do.wn',
    },
  },
  {
    title: 'If You Please',
    url: 'http://www.geocities.com/milq',
    author: {
      name: 'Caspar Milquetoast',
      email: 'hello@me.com',
    },
  },
]

/**
 * Challenge 1: return a list of author names in 'articles'
 * uisng only get, r.compose(), and r.map()
 */
const names = r.map(
  r.compose(
    get('name'),
    get('author')
  )
)
a.assertArraysAreEqual(['Debbie Downer', 'Caspar Milquetoast'], names(articles))

/**
 * Challenge 2: make a boolean function that describes if an
 * author wrote an article. use the above names function
 * as well as r.compose and r.contains.
 */
const isAuthor = function(name, articles) {
  return r.compose(
    r.contains(name),
    names
  )(articles)
}
a.assertEqual(false, isAuthor('New Guy', articles))
a.assertEqual(true, isAuthor('Debbie Downer', articles))

/** not point-free, but hey, it could have been more complicated... */

/**
 * Challenge 3: more to point-free than r.compose. let's write
 * a function that combines functions to let us write code w/ o
 * glue variables
 */
const fork = r.curry(function(lastly, f, g, x) {
  return lastly(f(x), g(x))
})

/**
 * The fork function is a pipeline like compose, except it
 * duplicates its value, sends it to two functions, then
 * sends the results to a combining function.
 *
 * now implement a function to compute the avg values in a
 * list using only fork, r.divide, r.sum, r.length
 */
const avg = fork(r.divide, r.sum, r.length)
a.assertEqual(3, avg([1, 2, 3, 4, 5]))

console.log('All compose tests pass.')

/**
 * points aka arguments; point-free = argument free
 * your data is the point
 * you know you're point free, when you're not writing
 * a function with arguments, then calling those arguments
 * in your function.
 * */

console.log(
  r.compose(
    get('title'),
    r.head
  )(articles)
)
r.compose(
  get('title'),
  l.log,
  r.head
)(articles)
