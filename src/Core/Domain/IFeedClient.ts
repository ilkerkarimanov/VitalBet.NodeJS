import { Feed } from '../models';

export interface IFeedClient{
    RetrieveSportsFeed():Promise<Feed>;
}