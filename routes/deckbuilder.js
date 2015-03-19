var express = require('express');
var router = express.Router();

var mtgjson = require('mtgjson');

/*
 * GET
 */
router.get('/cardList/:obj', function(req, res) {
    // var db = req.db;
    // db.collection('userlist').find().toArray(function (err, items) {
    //     res.json(items);
    // });
    console.log(req.params);
    var setCode = req.params['selectedSet'];
    console.log(setCode);
    console.log(data[setCode].cards);

    mtgjson(function(err, data) {
    if (err) return console.log(err);

      res.json(data[setCode].cards); // Prints out all cards from selected set set
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
