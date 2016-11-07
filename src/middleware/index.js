const path = require('path');
const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  // All GET requests to unknown paths go through React's index to facilitate
  // React Router. Feathers middleware should go above here.
  app.get('*', function(req, res) {
    res.sendFile( path.join(app.get('public'), 'index.html') );
  });

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
