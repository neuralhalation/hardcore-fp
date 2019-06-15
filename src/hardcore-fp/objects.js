/**
 * -Objects-
 * Containers/wrappers for values
 * No methods
 * Not nouns
 * Probably won't making your own often
 */

let _Container = function(val) {
  this.val = val
}

const Container = function(x) {
  return new _Container(x)
}
