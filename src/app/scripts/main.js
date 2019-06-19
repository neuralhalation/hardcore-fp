require.config({
  baseUrl: '/scripts',
  paths: {
    jquery: '../../node_modules/jquery/dist/jquery.min',
    ramda: '../../node_modules/ramda/dist/ramda',
    'pointfree-fantasy':
      '../../node_modules/pointfree-fantasy/dist/pointfree.amd',
    future: 'data.future.md',
    bacon: '../../node_modules/baconjs/dist/Bacon',
    socketio: '../../node_modules/socket.io/lib/socket',
  },
})
require(['jquery', 'app'], function($, app) {
  'use strict'

  $(app)
})
