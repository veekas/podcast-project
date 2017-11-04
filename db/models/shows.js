import { podcastDB } from './_db.js';

const Show = podcastDB.define('show', {
  categories: {},
  networks: {},
  image_files: {}
})

// relationships
  // show belongs to podcast
