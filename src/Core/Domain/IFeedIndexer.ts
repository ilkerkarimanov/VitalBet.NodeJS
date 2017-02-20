import {Feed} from '../models';

export interface IFeedIndexer{
    Index(feed:Feed): Promise<any>;
}