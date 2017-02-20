import {Feed} from '../models';

export interface IFeedCrawler{
    Crawl():Promise<Feed>;
}