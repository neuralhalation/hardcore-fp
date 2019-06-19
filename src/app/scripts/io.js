define([], function() {
  'use strict'
  const runIO = function(io) {
    return io.val()
  }

  const IOType = function(fn) {
    this.val = fn
    this.runIO = this.val
  }

  const IO = function(fn) {
    return new IOType(fn)
  }

  IOType.of = function(x) {
    return IO(function() {
      return x
    })
  }

  IOType.prototype.of = IOType.of

  IOType.prototype.chain = function(g) {
    const io = this
    return IO(function() {
      return g(io.val()).val()
    })
  }

  // Derived
  IOType.prototype.map = function(f) {
    return this.chain(function(a) {
      return IOType.of(f(a))
    })
  }

  IOType.prototype.ap = function(a) {
    return this.chain(function(f) {
      return a.map(f)
    })
  }

  const extendFn = function() {
    Function.prototype.toIO = function() {
      const me = this
      return function(x) {
        return IO(function() {
          return me(x)
        })
      }
    }
  }

  return { IO: IO, runIO: runIO, extendFn: extendFn }
})
