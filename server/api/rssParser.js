const axios = require('axios');
const FeedMe = require('feedme');
const router = require('express')();

router.get('/', (req, res) => {
  const parser = new FeedMe(true);

  axios({
    method: 'get',
    url: 'http://themainloop.libsyn.com/rss',
    responseType: 'stream'
  })
    .catch(error => {
      console.error('Error fetching feed: ' + error.toString());
      res.status(error.statusCode).send(error.toString());
    })
    .then(response => response.data.pipe(parser));

  parser.on('error', error => {
    console.error('Error parsing feed: ' + error.toString());
    res.status(error.statusCode).send(error.toString());
  });

  parser.on('end', () => {
    console.log('Finished parsing feed');
    res.json(parser.done().items);
  });

});

module.exports = router;
