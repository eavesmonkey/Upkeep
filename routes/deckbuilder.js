var express = require('express');
var router = express.Router();

var mtgjson = require('mtgjson');

/**
 * Get
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
      var cardSet = data[setCode].cards;

      if (setCode !== '') {
        resSet = cardSet;
      }

      // select cards on selected color
      if (cardColors !== undefined) {
        resSet = cardSet.filter(function(el) {
          if (el.colors !== undefined) {
            var elColors = el.colors;

            return cardColors.every(function(color) {
              return ~elColors.indexOf(color);
            });
          }

        });
      }

      // select cards on card type
      if (cardType !== undefined) {
        resSet = resSet.filter(function(el) {
           return el.types.indexOf(cardType[0]) != -1;
        });
      }

      res.json(resSet); // Prints out all cards from selected set set
    });
});

/**
 * Post
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

/**
 *
 * @param arr
 * @param criteria
 * @returns {*}
 */
function filter(arr, criteria) {
  return arr.filter(function(obj) {
    return Object.keys(criteria).every(function(c) {
      return obj[c] == criteria[c];
    });
  });
}

module.exports = router;
