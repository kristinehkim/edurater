const db = require('../config/connection');
const { User, Rate } = require('../models');
const userSeeds = require('./userSeeds.json');
const rateSeeds = require('./rateSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Rate', 'rates');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < rateSeeds.length; i++) {
      const { _id, rateAuthor } = await Rate.create(rateSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: rateAuthor },
        {
          $addToSet: {
            rates: _id,
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
