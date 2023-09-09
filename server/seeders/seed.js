const db = require('../config/connection');
const { User, Rating } = require('../models');
const userSeeds = require('./userSeeds.json');
const ratingSeeds = require('./ratingSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Rating', 'ratings');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < ratingSeeds.length; i++) {
      const { _id, ratingAuthor} = await Rating.create(ratingSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: ratingAuthor },
        {
          $addToSet: {
            ratings: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
