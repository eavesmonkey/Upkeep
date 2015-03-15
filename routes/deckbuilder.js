var express = require('express');
var router = express.Router();

var mtgjson = require('mtgjson');

/*
 * GET a card set.
 */
router.get('/cardList', function(req, res) {
    // var db = req.db;
    // db.collection('userlist').find().toArray(function (err, items) {
    //     res.json(items);
    // });
    mtgjson(function(err, data) {
    if (err) return console.log(err);

      res.json(data.FRF.cards); // Prints out all cards from selected set set
    });
});

/*
 * POST to adduser.
 */
router.post('/cardList', function(req, res) {
    // var db = req.db;
    // db.collection('userlist').insert(req.body, function(err, result){
    //     res.send(
    //         (err === null) ? { msg: '' } : { msg: err }
    //     );
    // });
    console.log(req);
});

module.exports = router;
