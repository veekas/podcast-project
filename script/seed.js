/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const Promise = require('bluebird');
const db = require('../server/db')
const {
  User,
  Podcast,
  Episode
} = require('../server/db/models')

const ezraData = require('../data/ezra-klein-show.json')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({
      email: 'veekas@veekasmeansprogress.com',
      firstName: 'Veekas',
      lastName: 'Shrivastava',
      password: '123'
    }),
    User.create({
      email: 'alex.blumberg@gimletmedia.com',
      firstName: 'Alex',
      lastName: 'Blumberg'
    }),
    User.create({
      email: 'ezra.klein@voxmedia.com',
      firstName: 'Ezra',
      lastName: 'Klein'
    })
  ]);

  const podcasts = await Promise.map(ezraData, function (podcast) {
      return Podcast.create(podcast);
  });

  const episodes = await Promise.map(ezraData, function (episode) {
      return Episode.create(episode);
  });

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${podcasts.length} users`)
  console.log(`seeded ${episodes.length} users`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

  // turn it back to async await
// db.sync({ force: true })
//   .then(function () {
//     console.log('Dropped old podcast data, now inserting new data');
//     return Promise.map(ezraData, function (podcast) {
//       return Podcast.create(podcast);
//     })
//   })
//   .then(function () { // does not have to be sequential
//     return Promise.map(userData, function (user) {
//       console.log('Creating new users');
//       return User.create(user);
//     })
//   })
//   .then(function () { //write finally db.close
//     console.log('Finished inserting pokemon (press ctrl-c to exit)');
//   })
//   .catch(function (err) {
//     console.error('There was totally a problem', err, err.stack);
//   });


/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
