var express = require('express');
var router = express.Router();

var mtgjson = require('mtgjson');
var queryString = require('querystring');

/*
 * GET
 */
router.get('/cardList/:qs?', function(req, res) {
    // var db = req.db;
    // db.collection('userlist').find().toArray(function (err, items) {
    //     res.json(items);
    // });
    console.log(req.query);

    var setCode = req.query.selectedSet;
    var cardColors = req.query.selectedColors;
    var cardType = req.query.selectedType;
    var resSet = [];

    mtgjson(function(err, data) {
      if (err) return console.log(err);

      // get complete set
      set = data[setCode].cards;

      // apply colorfilter ( TODO currently only one color)
      resSet = set.filter(function (el) {
        return el.colors == cardColors[0] &&
                el.type == cardType;
      });

      // apply card type filter

      res.json(resSet); // Prints out all cards from selected set set
    });
});

/*
 * POST
 */
router.post('/cardList', function(req, res) {
    // var db = req.db;
    // db.collection('userlist').insert(req.body, function(err, result){
    //     res.send(
    //         (err === null) ? { msg: '' } : { msg: err }
    //     );
    // });

    // Code to get certain set e.g FRF
    // var setCode = req.body['selectedSet'];
    // console.log(req.body['selectedSet']);
    res.send((err === null) ? { msg: setCode } : { msg: err });

});

module.exports = router;
