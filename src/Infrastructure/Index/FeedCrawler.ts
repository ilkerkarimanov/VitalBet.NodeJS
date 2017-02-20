import {IFeedCrawler, IFeedClient} from '../../Core/Domain';
import {Feed} from '../../Core/Models';

export class FeedCrawler implements IFeedCrawler {

private _feedClient: IFeedClient;

constructor(feedClient: IFeedClient) {
    this._feedClient = feedClient;
}
    public Crawl():Promise<Feed>{
            return this._feedClient.RetrieveSportsFeed();
        
    }

}