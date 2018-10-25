require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Recruit} = require('./models/recruit');

var app = express();
const port = process.env.PORT;
app.use(bodyParser.json());


app.post('/recruit', (req,res) =>{
  var body = _.pick(req.body, ['name', 'note', 'status']);
  var recruit = new Recruit(body);
  console.log(recruit);
  recruit.save().then(()=>{
    res.status(200).send();
  }).catch((e)=>{
    res.status(400).send(e);
  });
});

app.get('/recruits', (req, res) => {
  Recruit.find().then((recruits)=>{
    res.send({recruits});
  }).catch((e)=>{
    res.send(e);
  });
});

app.patch('/recruits/:id', (req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body, ['note', 'status']);

  if (!ObjectID.isValid(id)){
    res.status(404).send();
  }

  Recruit.findOneAndUpdate({_id:id}, {$set: body}, {new: true}).then((recruit) => {
    if (!recruit) {
      return res.status(404).send();
    }
    res.send({recruit});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/recruits/:id', (req,res)=>{
  var id = req.params.id;
  if (!ObjectID.isValid(id)){
    res.status(404).send();
  }
  Recruit.findOneAndRemove({
    _id: id,
  }).then((recruit)=>{
    if (!recruit) {
      res.status(404).send();
    }
    res.send({recruit});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
