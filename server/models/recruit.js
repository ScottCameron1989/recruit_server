const mongoose = require('mongoose');
const _ = require('lodash');

var RecruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    unique: true
  },
  note: {
    type: String,
    require: false,
    minlength: 1
  },
  status: {
      type: String,
      require: false,
      minlength: 1
    }
});

RecruitSchema.methods.toJSON = function () {
  var recruit = this;
  var recruitObject = recruit.toObject();
  return _.pick(recruitObject, ['_id', 'name', 'note', 'status']);
};

var Recruit = mongoose.model('Recruit', RecruitSchema);

module.exports = {Recruit};
