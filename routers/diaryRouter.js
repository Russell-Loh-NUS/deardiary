let router = require('express').Router();
let mongoose = require('mongoose');
const DiaryModel = mongoose.model('diary', mongoose.Schema({ title: String, body: String }, {timestamps: true}));

// GET all diary entries
router.get('/', (req, res) => {
  DiaryModel.find(function (err, result) {
    if (err) {
      return res.json({ status: 500, data: err });
    }
    if(!result){ // Empty result
      return res.status(200).json({
          data: "There are no diary entries stored. Start by adding one using a POST request!"
      });
    }

    return res.status(200).json({
        data: result
    });
  });
});

// GET a specific diary entry
router.get('/:id', (req, res) => {
  let id = req.params.id;

  if(!id){
    return res.json({ status: 400, data: "Please ensure that you have specified an id." });
  }

  DiaryModel.findById(id, function (err, result) {
    if (err) {
      return res.status(500).json({ data: err });
    }
    if(!result){ // Empty result
      return res.status(200).json({
          data: "Unable to find diary entry."
      });
    }

    return res.status(200).json({
        data: result
    });
  });
});

// POST a new diary entry
router.post('/', (req, res) => {
  let data = req.body;
  if(!data.title || !data.body){
    return res.status(400).json({ data: "Please ensure you have entered a title and a body." });
  }

  let entry = new DiaryModel({ title: data.title, body: data.body });

  entry.save(function (err) {
    if (err) {
      return res.status(500).json({ data: err });
    }

    return res.status(200).json({
        data: "Diary entry created successfully."
    });
  });
});

// PUT an updated diary entry
router.put('/:id', (req, res) => {
  let data = req.body;
  let id = req.params.id;

  if(!id || (!data.title && !data.body)){
    return res.status(400).json({ data: "Please ensure you have entered either a title or a body and specified an id." });
  }

  let entry = new DiaryModel({ title: data.title, body: data.body });

  DiaryModel.findById(id, function (err, result) {
    if (err) {
      return res.status(500).json({ data: err.reason });
    }
    if(!result){ // Empty result
      return res.status(200).json({
          data: "Unable to find diary entry."
      });
    }

    result.title = (data.title) ? data.title : result.title;
    result.body = (data.body) ? data.body : result.body;

    result.save(function (err) {
      if (err) {
        return res.status(500).json({ data: err });
      }

      return res.status(200).json({
          data: "Diary entry updated successfully."
      });
    });
  });
});

// DELETE a diary entry
router.delete('/:id', (req, res) => {
  let id = req.params.id;

  if(!id){
    return res.status(400).json({ data: "Please ensure that you have specified an id." });
  }

  DiaryModel.remove({ _id: id }, function (err, result) {
    if (err) {
      return res.status(500).json({ data: err });
    }

    if(result.deletedCount == 0){ // Empty result
      return res.status(200).json({
          data: "Unable to find diary entry."
      });
    }

    return res.status(200).json({
        data: "Diary entry deleted successfully."
    });
  });

});

module.exports = router;
