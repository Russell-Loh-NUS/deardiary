let router = require('express').Router();
let mongoose = require('mongoose');
const DiaryModel = mongoose.model('diary', mongoose.Schema({ title: String }));

// Get all diary entries
router.get('/', function (req, res) {
  DiaryModel.find(function (err, result) {
    if (err) {
      return res.json({ status: 500, data: err });
    }
    res.json({
        status: 200,
        data: result
    });
  });
});

module.exports = router;
