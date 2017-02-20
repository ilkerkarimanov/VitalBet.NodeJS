import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';
import FeedsRouter from '../App/Routes/FeedsRouter';
import MatchesRouter from '../App/Routes/MatchesRouter';
import MatchHub from '../App/Hubs/MatchHub';
// Creates and configures an ExpressJS web server.
class Server {

  // ref to Express instance
  public express: express.Application;
  public io: SocketIO.Server;
  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.io = socketIO();
    this.io.serveClient(true); // the server will serve the client js file

    this.middleware();
    this.routes();
    this.connections();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.sendFile(__dirname + '/index.html');
    });
    this.express.use('/', router);
    this.express.use('/api/feeds', FeedsRouter);
    this.express.use('/api/matches', MatchesRouter);
  }

  public connections(): void {
    // listen for a connection
    this.io.on('connection', function (socket) {
      console.log('User ' + socket.id + ' connected');
      MatchHub.matches(socket);
    });
  }
}
export default new Server();