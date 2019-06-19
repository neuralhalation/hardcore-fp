require.config({
  baseUrl: '/scripts',
  paths: {
    jquery: 'jquery',
    ramda: 'ramda',
    pointfree: 'pointfree',
    future: 'data.future.md',
  },
})
require(['jquery', 'app'], function($, app) {
  'use strict'

  $(app)
})
