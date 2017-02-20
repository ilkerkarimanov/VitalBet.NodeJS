import {Router, Request, Response, NextFunction} from 'express';
import { SportFinderObj as SportFinder } from '../DI';

export class MatchRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.init();
  }

    public matches(req: Request, res: Response, next: NextFunction) {
    SportFinder.GetMatchesForNext24Hours(new Date())
            .then((result) => {
                res.send({'matches': result});
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

    this.router.get('/', this.matches);
  }

}

let MatchesRoutes = new MatchRouter();
MatchesRoutes.init();

export default MatchesRoutes.router;