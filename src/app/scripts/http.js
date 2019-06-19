const $ = require('jquery')
const Future = require('./data.future.umd')

return {
  getJSON: function(url) {
    return new Future(function(rej, res) {
      $.getJSON(url, res)
    })
  },
}
