//get script folder back

const Promise = require('bluebird');

const db = require('../server/db');
const Podcasts = require('../server/db/models').Podcasts
const User = require('../server/db/models').User

const data = require('./seed.json');

const userData = [{
    email: 'veekas@veekasmeansprogress.com',
    firstName: 'Veekas',
    lastName: 'Shrivastava'
  },
  {
    email: 'alex.blumberg@gimletmedia.com',
    firstName: 'Alex',
    lastName: 'Blumberg'
  }, {
    email: 'ezra.klein@voxmedia.com',
    firstName: 'Ezra',
    lastName: 'Klein'
  }
]


// turn it back to async await
db.sync({
    force: true
  })
  .then(function () {
    console.log('Dropped old podcasts, now inserting podcasts');
    return Promise.map(data, function (podcasts) {
      return Podcasts.create(podcasts);
    })
  })
  .then(function () { // does not have to be sequential
    return Promise.map(userData, function (user) {
      console.log('Creating new users');
      return User.create(user);
    })
  })
  .then(function () { //write finally db.close
    console.log('Finished inserting podcasts (press ctrl-c to exit)');
  })
  .catch(function (err) {
    console.error('There was totally a problem', err, err.stack);
  });

