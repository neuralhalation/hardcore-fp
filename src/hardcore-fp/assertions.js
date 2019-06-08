function assertArraysAreEqual(x, y) {
  if (x.length !== y.length) throw `expected ${x} to = ${y}`
  for (let i in x) {
    if (x[i] !== y[i]) {
      throw `expected ${x} to = ${y}`
    }
  }
}

function assertEqual(x, y) {
  if (x !== y) throw `expected ${x} to = ${y}`
}

exports.assertArraysAreEqual = assertArraysAreEqual
exports.assertEqual = assertEqual
