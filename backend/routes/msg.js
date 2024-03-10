var express = require("express");
var router = express.Router();
const { createMsg } = require("../service/msgService");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/createMsg", function (req, res, next) {
  createMsg(req, res).then((data) => {
    res.json(data);
  });
});


module.exports = router;
