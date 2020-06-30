const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  pob: {
    type: String,
    required: true
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
      delete ret.__v;
    }
  }
});

schema.virtual('actor', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'actor'
});


module.exports = mongoose.model('Actor', schema);
