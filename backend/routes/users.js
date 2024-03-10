var express = require('express');
var router = express.Router();
const { login,register,addFriend,getFriendsList,delFriend,verifyFriends,findFriend } = require('../service/userService');
const {validateToken} = require('../middleware/auth');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/login', function(req, res, next) {
  login(req, res).then(data => {
    res.json(data);
  });
});
router.post('/register', function(req, res, next) {
  register(req, res).then(data => {
    res.json(data);
  });
});
router.post('/addFriend',validateToken, function(req, res, next) {
  addFriend(req, res).then(data => {
    res.json(data);
  });
});
router.post('/getFriendsList',validateToken, function(req, res, next) {
  getFriendsList(req, res).then(data => {
    res.json(data);
  });
});
router.post('/delFriend',validateToken, function(req, res, next) {
  delFriend(req, res).then(data => {
    res.json(data);
  });
});
router.post('/verifyFriends',validateToken, function(req, res, next) {
  verifyFriends(req, res).then(data => {
    res.json(data);
  });
});
router.post('/findFriend',validateToken, function(req, res, next) {
  findFriend(req, res).then(data => {
    res.json(data);
  });
});


module.exports = router;
