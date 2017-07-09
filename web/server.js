import path from 'path';
import express from 'express';
import r from 'rethinkdb';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';

import changefeedSocketEvents from './socket-events.js';

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

// const publicPath = path.resolve(__dirname, 'public');

const inDevelopment = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

// We only want to run the workflow when not in production
if (inDevelopment) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    watchOptions: { poll: true }, // Disable this if docker inotify issue is resolved
    // Also remove -L arg to nodemon on package.json
    // https://github.com/docker/for-win/issues/56
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'app',
    stats: {
      colors: true,
      hash: true,
      timings: true,
      chunks: true,
      chunkModules: true,
      modules: true
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


r.connect({ host: '172.19.0.3', db: 'test' })
.then((connection) => {
  io.on('connection', (socket) => {
    socket.on('todo:client:insert', (turtle) => {
      r.table('turtles').insert(turtle).run(connection);
    });

    socket.on('todo:client:update', (turtle) => {
      var id = turtle.id;
      delete turtle.id;
      r.table('turtles').get(id).update(turtle).run(connection);
    });

    // delete todo
    socket.on('todo:client:delete', (turtle) => {
      var id = turtle.id;
      delete turtle.id;
      r.table('turtles').get(id).delete().run(connection);
    });

    // emit events for changes to todos
    r.table('turtles').changes({ includeInitial: true, squash: true }).run(connection)
    .then(changefeedSocketEvents(socket, 'todo'));
  });

  // And run the server
  http.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });
})
.error((error) => {
  console.log('Error connecting to RethinkDB!');
  console.log(error);
});