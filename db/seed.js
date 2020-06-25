const chance = require('chance').Chance();
const Actor = require('../lib/models/Actor');
// const Film = require('../lib/models/Film');
// const Review = require('../lib/models/Review');
// const Reviewer = require('../lib/models/Reviewer');
// const Studio = require('../lib/models/Studio');

module.exports = async({ actors = 20 } = {}) => {
  const actorArray = await Promise.all([...Array(actors)].map(async() => {
    return Actor.create({
      name: chance.name(),  
      dob: chance.date(),
      pob: chance.city() + ', ' + chance.state()
    });
  }));
};
