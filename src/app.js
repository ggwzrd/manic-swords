const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');

const app = feathers();

const configType = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

if (configType === 'dev') {
  const webpack = require('webpack')
  const config = require(`../webpack.config.${configType}.js`)
  const compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler))
 }

app.configure(configuration(path.join(__dirname, '..')))

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  // TODO two static locations?
  .use('/', serveStatic( app.get('public') ))
  .use('/static', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

module.exports = app;
