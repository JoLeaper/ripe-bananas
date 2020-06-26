const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  }
});

schema.virtual('films,' [{
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
}]);

module.exports = mongoose.model('Studio', schema);
