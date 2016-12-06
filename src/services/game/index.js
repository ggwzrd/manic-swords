'use strict';

const service = require('feathers-mongoose');
const game = require('./game-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: game,
    // TODO set overwrite to false to see if this solves the patching issue, looks like it doesn't
    // Feathersjs docs: overwrite (default: true) [optional] - Updates completely replace existing documents.
    // question: is update service method with overwrite false the same as patch service method ??
    overwrite: false,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/games', service(options));

  // Get our initialize service to that we can bind hooks
  const gameService = app.service('/games');

  // Set up our before hooks
  gameService.before(hooks.before);

  // Set up our after hooks
  gameService.after(hooks.after);
};
