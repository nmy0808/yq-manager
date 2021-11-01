const { success } = require('../utils/util');

var router = require('koa-router')();

router.prefix('/users');

router.get('/', function *(next) {
  this.body = 'this is a users response!';
});

router.get('/bar', function *(next) {
  this.body = success('abc','ok');
});

module.exports = router;
