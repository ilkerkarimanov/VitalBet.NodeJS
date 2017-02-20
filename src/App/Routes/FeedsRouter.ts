import {Router, Request, Response, NextFunction} from 'express';
import { FeedCrawlerObj as FeedCrawler, FeedIndexerObj as FeedIndexer } from '../DI';

export class FeedsRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }


  public index(req: Request, res: Response, next: NextFunction) {
    FeedCrawler.Crawl()
            .then((feed) => {
                //console.log(feed);
                FeedIndexer.Index(feed)
                .then((status) => { 
                  res.send({'status': 'ok'});
                })
                .catch((err) => {
                    console.error(err);
                    res.send({'status': 'failed'});
                });
            })
            .catch((error) => {
              console.error(error);
              res.send({'status': 'failed'});
            });

  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/index', this.index);
  }

}


let FeedsRoutes = new FeedsRouter();
FeedsRoutes.init();

export default FeedsRoutes.router;