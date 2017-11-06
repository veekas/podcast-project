import { podcastDB } from './_db.js';

const Episode = podcastDB.define('episode', {
  itunes_episode: {},
  description: {},
  tags: {},
  identifier: {}
});

// relationships

  // episode belongs to show
