'use strict';

import { podcastDB } from './_db.js';

// definitions
const User = podcastDB.define('user', {
  id: {},
  username: {
    // must be unique
  },
  first_name: {},
  last_name: {},
  email: {}
});

// relationships
  // liked episodes
  // disliked episodes


// social networks?
// social authentication?
